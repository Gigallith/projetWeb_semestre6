import { Component, Input, OnInit } from "@angular/core";

import { MessageModel } from "../../../shared/models/MessageModel";


@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {

  @Input() message: MessageModel;
   private fb: boolean;
   private url: string;

  constructor() {
    this.message = new MessageModel(0, "Hello!");
  }
  /**
   * Fonction ngOnInit.
   * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
   * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
   * Notre composant qui prend en @Input un message. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
   * pas dans le constructeur. Si vous souhaitez manipuler votre message lors du chargement du composant, vous devez
   * le faire dans le ngOnInit.
   */
  ngOnInit() { }

  checkfb(): boolean {
    const strposition = this.message.content.indexOf("http");
    if (strposition >= 0 && this.message.content.indexOf("youtube") >= 0) {
      this.url = this.message.content.substr(strposition);
      this.url = this.url.split(" ")[0];
      this.url = this.url.replace("watch?v=" , "embed/");
    return true;
    } else {
    return false;
    }
  }

}
