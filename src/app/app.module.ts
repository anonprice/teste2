import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http";
import { StatusBar } from '@ionic-native/status-bar';
 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ItensPage } from '../pages/itens/itens';
import { DetalhesPage } from '../pages/detalhes/detalhes';
import { DetalhesItemPage } from '../pages/detalhes-item/detalhes-item';
import { ConsultaProvider } from '../providers/consulta/consulta';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PesquisaPage } from '../pages/pesquisa/pesquisa';
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItensPage,
    DetalhesPage,
    DetalhesItemPage,
    PesquisaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItensPage,
    DetalhesPage,
    DetalhesItemPage,
    PesquisaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConsultaProvider,
    CallNumber,
    SocialSharing
  ]
})
export class AppModule {}