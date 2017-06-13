import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {MessageModel} from "../../models/MessageModel";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {THREADPAGE, URLSERVER} from "shared/constants/urls";
import {extractMessages} from "@angular/compiler/src/i18n/extractor_merger";
import {isNumber} from "util";
import {forEach} from "@angular/router/src/utils/collection";
import {MessageListComponent} from "../../../app/messages/message-list/message-list.component";

@Injectable()
export class MessageService {

  /**
   * Url pour accéder aux données. L'url est commun à toutes les fonctions du service.
   * Il permet d'accéder aux channels. À partir de cet url, vous pourrez accéder aux messages.
   * La documentation des methodes du service permet d'avoir plus d'information concernant la façon d'accèder aux messages.
   */
  private url: string;

  private finalTabList : MessageModel[];

  /**
   * MessageList$ est un type d'Observable particulier appelé ReplaySubject.
   * MessageList$ est un flux d'évenements qui stock la liste des messages. A chaque fois que l'on fait une requète
   * pour récupérer la liste des messages, messageList$ va pousser cette nouvelle liste dans son flux pour permettre
   * aux composants qui l'écoutent de récupérer les messages. Pour plus d'infos sur les observables, voir le README.md du projet
   * dans lequel vous trouverez une première explication sur les observables ainsi qu'une vidéo tutoriel.
   */
  public messageList$: ReplaySubject<MessageModel[]>;

  constructor(private http: Http) {
    this.url = URLSERVER;
    this.messageList$ = new ReplaySubject(1);
    this.messageList$.next([new MessageModel()]);
    this.finalTabList = [];
  }

  private resetTab(){
    this.finalTabList = [];
  }

  /**
   * Fonction getMessage.
   * Cette fonction permet de récupérer la liste des messages pour un channel donné. Elle prend en parametre:
   * - route: La route. C'est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète.
   *          Pour l'envoie des messages la route doit avoir la structure suivante: :id/messages avec ":id" étant
   *          un nombre entier correspondant à l'identifiant (id) du channel.
   * Exemple de route: 1/messages
   * @param route
   * @returns {Observable<R>}
   */
  public getMessages(route: string, index : number, max_num : number) {

    this.extractMessagesByPage(route, index).subscribe(
      (response) =>
      {
        this.finalTabList = this.finalTabList.concat(response.json());

        if (index < max_num){
          let tmp = index + 1;
          this.getMessages(route, tmp, max_num);
        } else {

          this.emojiTransform(this.finalTabList);

          this.finalTabList.reverse();

          this.messageList$.next(this.finalTabList);
        }
      }
    );
  }

  private extractMessagesByPage(route: string, pageNum : number) : Observable<Response>{
    const finalUrl = this.url + route + THREADPAGE + pageNum;

    return this.http.get(finalUrl);
  }

  /**
   * Fonction sendMessage.
   * Cette fonction permet l'envoi d'un message. Elle prend en paramêtre:
   * - route: La route est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète. Pour
   *          l'envoie des messages la route doit avoir la structure suivante: :id/messages avec ":id" étant un nombre
   *          entier correspondant à l'identifiant (id) du channel.
   *          Exemple de route: 1/messages
   * - message: Le message à envoyer. Ce message est de type MessageModel.
   * @param route
   * @param message
   */
  public sendMessage(route: string, message: MessageModel) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    let body = {
      "id": message.id,
      "content": message.content,
      "from": message.from,
      "createdAt": message.createdAt,
      "updatedAt": message.updatedAt,
      "threadId": message.threadId
    };

    let finalPath = this.url + route;

    this.http.post(finalPath, body, options).subscribe((response) => this.extractMessageAndGetMessages(response, finalPath));

  }

  /**
   * Fonction extractAndUpdateMessageList.
   * Cette fonction permet d'extraire la liste des messages de la 'response' reçue et ensuite de mettre à jour la liste
   * des message dans l'observable messageList$.
   * Elle est appelée dans la fonction getMessages et permet de directement récuperer une liste de MessageModel. Pour récupérer
   * les données de la reponse, il suffit d'appeler la fonction .json() qui retourne le body de la réponse.
   * @param response
   */
  extractAndUpdateMessageList(route : string) {
    this.resetTab();

    this.getMessages(route ,0,MessageListComponent.max_page);
  }

  /**
   * Fonction extractMessage.
   * Cette fonction permet d'extraire les données reçues à travers les requêtes HTTP. Elle est appelée dans la fonction
   * sendMessage et permet de directement récuperer un MessageModel.
   * Elle va également faire un nouvel appel pour récupérer la liste complete des messages pour pouvoir mettre à jour la
   * liste des messages dans les composants.
   * @param response
   * @param route
   * @returns {any|{}}
   */
  private extractMessageAndGetMessages(response: Response, route: string): MessageModel {

    this.http.get(route).subscribe((response) => this.extractAndUpdateMessageList(route));

    return new MessageModel(
      response.json().id,
      response.json().content,
      response.json().from,
      response.json().createdAt,
      response.json().updatedAt,
      response.json().threadId);
  }

  private emojiTransform(messageList) {

    for (let i = 0; i < messageList.length; i++) {
      //console.log('>>>>', messageList[i].content);
      messageList[i].content = messageList[i].content.replace(/:\)/g, "😃");
      messageList[i].content = messageList[i].content.replace(/;\)/g, "😉");
      messageList[i].content = messageList[i].content.replace(/:'\(/g, "😢");
      messageList[i].content = messageList[i].content.replace(/:\(/g, "🙁");
      messageList[i].content = messageList[i].content.replace(/:D/g, "😄");
      messageList[i].content = messageList[i].content.replace(/:p/g, "😄");
      messageList[i].content = messageList[i].content.replace(/<3/g, "❤️");
      messageList[i].content = messageList[i].content.replace(/:o/g, "😮");
      messageList[i].content = messageList[i].content.replace(/O_O/g, "😳");
    }

  }

}

