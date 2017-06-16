import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import set = Reflect.set;

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"]
})
export class MessageListComponent implements OnInit {
  public static max_page: number;

  public messageList: MessageModel[];

  private route: string;
  private routeCount: string;
  title: String = "Chat";

  constructor(private messageService: MessageService, private channelservice: ChannelService) {
    this.route = "/messages";
    this.routeCount = "/count";
    MessageListComponent.max_page = 0;

    Observable.interval(1500)
      .subscribe(() => {
        if (this.messageService.getChannelID() != null) {
          this.updateList();
        }
      });

    this.channelservice.titre$.subscribe(titre => {
      this.title = titre;
    }, error => {
      console.log("error: " + error); });
  }

  /**
   * Fonction ngOnInit.
   * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
   * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
   * Le composant MessageComponent prend en @Input un message. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
   * pas dans le constructeur.
   * En general, l'utilisation des services dans le NgOnInit est une bonne practice. Le constructeur ne doit servir qu'à
   * l'initialisation simple des variables. Pour plus d'information sur le ngOnInit, il y a un lien dans le README.
   */
  ngOnInit() {
  }

  /**
   * Method we call whenever the user wants to retrieve the older messages on the current channel
   */
  private loadMoreMessages() {
    MessageListComponent.max_page = MessageListComponent.max_page + 1;
    this.updateList();
  }

  /**
   * Method we call every X seconds to check if the thread contains new messages.
   */
  private updateList() {
    this.messageService.extractAndUpdateMessageList(this.messageService.getChannelID() + this.route);
    this.messageService.messageList$.subscribe((messages) => this.messageList = messages);
  }

  /**
   * Method that is used when we update the chat messages. If the message has been loaded already, it doesn't actualise it
   *
   * @param index the index of the message
   * @param message the message we want to check if the app already loaded it.
   */
  trackByFn(index, message) {
    return message.id;
  }
}
