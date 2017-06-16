import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import set = Reflect.set;
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";

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

  constructor(private messageService: MessageService) {
    this.route = "/messages";
    this.routeCount = "/count";
    MessageListComponent.max_page = 0;

    Observable.interval(1000)
      .subscribe(() => {
        if (this.messageService.getChannelID() != null) {
          this.updateList();
        }
      });
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

  private loadMoreMessages() {
    MessageListComponent.max_page = MessageListComponent.max_page + 1;
    this.updateList();
  }

  private updateList() {
    this.messageService.extractAndUpdateMessageList(this.messageService.getChannelID() + this.route);
    this.messageService.messageList$.subscribe((messages) => this.messageList = messages);
  }

  trackByFn(index, message){
    return message.id;
  }
}
