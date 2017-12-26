import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ConsultaProvider } from '../../providers/consulta/consulta';

/**
 * Generated class for the DetalhesItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-item',
  templateUrl: 'detalhes-item.html',
})
export class DetalhesItemPage {
  public loader;
  public refresher;
  public detalhesItem = new Array<any>();;
  public isRefreshing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public consultaProvider: ConsultaProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.abreCarregamento();
    this.consultarDetalhesItem();
  }
  //Abrir tela de carregando
  abreCarregamento() {
  this.loader = this.loadingCtrl.create({
    content: "Carregando Informações...",
  });
  this.loader.present();
  }
  //Fechar tela de carregando
  fechaCarregamento(){
    this.loader.dismiss();
  }
  //Função para consumir api com detalhes do item
  consultarDetalhesItem(){
    this.consultaProvider.pegarDetalhesItem(this.navParams.get("item")).subscribe(data => {
        let retorno = (data as any)._body;
        this.detalhesItem = JSON.parse(retorno);
        console.log(this.detalhesItem);
        this.fechaCarregamento();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        this.fechaCarregamento();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

}
