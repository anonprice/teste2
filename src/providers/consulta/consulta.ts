import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConsultaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConsultaProvider {
  //Api base
  public apiBase = "http://pux.design/admincardapio/api/";

  constructor(public http: Http) {
    console.log('Hello ConsultaProvider Provider');
  }
  //Função para listar api com empresas da categoria selecionada
  pegarLocaisCategoria(categoria){
    return this.http.get(this.apiBase + 'categoria/' + categoria);
  }
  //Função para listar api com detalhes do local selecionado
  pegarDetalhes(local){
    return this.http.get(this.apiBase + 'local/detalhes/' + local);
  }
  //Função para listar api com detalhes do local selecionado
  pegarDetalhesCardapio(local){
    return this.http.get(this.apiBase + 'itens/' + local);
  }
  //Função para listar api com detalhes do local selecionado
  pegarDetalhesItem(local){
    return this.http.get(this.apiBase + 'itens/detalhes/' + local);
  }
  //Função para listar itens com pesquisa
  pegarItensPesquisa(item){
    return this.http.get(this.apiBase + 'itens/pesquisar/' + item);
  }
}
