import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConsultaProvider } from '../../providers/consulta/consulta';
import { LoadingController } from 'ionic-angular';
import { DetalhesPage } from '../detalhes/detalhes';

/**
 * Generated class for the ItensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itens',
  templateUrl: 'itens.html',
})
export class ItensPage {
  public locais = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public erro;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public consultaProvider: ConsultaProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.abreCarregamento();
    this.consultarLocais();
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
  //Função que realiza a consulta de locais
  consultarLocais(){
    this.consultaProvider.pegarLocaisCategoria(this.navParams.get("categoria")).subscribe(data => {
        let retorno = (data as any)._body;
        this.locais = JSON.parse(retorno);
        console.log(this.locais);
        this.fechaCarregamento();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        this.fechaCarregamento();
        this.erro = error;
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }
  //Função para abrir detalhes do local
  abrirDetalhes(local){
    this.navCtrl.push(DetalhesPage, {local: local});
  }

}
