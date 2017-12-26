import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ConsultaProvider } from '../../providers/consulta/consulta';
import { DetalhesItemPage } from '../detalhes-item/detalhes-item';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the DetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})
export class DetalhesPage {
  public loader;
  public refresher;
  public detalhesLocal;
  public cardapio = new Array<any>();
  public isRefreshing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public consultaProvider: ConsultaProvider,
    public loadingCtrl: LoadingController,
    private callNumber: CallNumber,
    private socialSharing: SocialSharing
  ) {
  }

  ionViewDidLoad() {
    this.abreCarregamento();
    this.consultarDetalhes();
    this.consultarDetalhesCardapio();

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
  //Função para abrir detalhes do item
  abrirDetalhesItem(item){
    this.navCtrl.push(DetalhesItemPage, {item: item});
  }
  //Função que realiza a consulta de detalhes do local
  consultarDetalhes(){
    this.consultaProvider.pegarDetalhes(this.navParams.get("local")).subscribe(data => {
        let retorno = (data as any)._body;
        this.detalhesLocal = JSON.parse(retorno);
      }, error => {
        console.log(error);
      }
    )
  }
  //Função que realiza a consulta de detalhes do local
  consultarDetalhesCardapio(){
    this.consultaProvider.pegarDetalhesCardapio(this.navParams.get("local")).subscribe(data => {
        let retorno = (data as any)._body;
        this.cardapio = JSON.parse(retorno);
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
  //Função para ligar
  ligar(telefone){
    this.callNumber.callNumber(telefone, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }
  //Função chamar no whatsapp
  chamar(celular){
    // Share via email
    this.socialSharing.shareViaWhatsAppToReceiver(celular, '', '').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
}
}
