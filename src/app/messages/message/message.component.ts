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
   private urlyb: string;
   private urlins: string;

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
    let http_str : string = "http";

    if (this.message.content != null && this.message.content.includes(http_str)) {
      const strposition = this.message.content.indexOf(http_str);
      this.urlyb = this.message.content.substr(strposition).split(" ")[0];
      if (strposition >= 0 && this.urlyb.indexOf("youtube") >= 0) {
        this.urlyb = this.urlyb.replace("watch?v=", "embed/");
        return true;
      } else {
        return false;
      }
    }
  }

  checkins(): boolean {
    let http_str : string = "http";

    if (this.message.content != null && this.message.content.includes(http_str)) {
      const strposition = this.message.content.indexOf(http_str);
      this.urlins = this.message.content.substr(strposition).split(" ")[0];
      if (strposition >= 0 && this.urlins.indexOf("instagram") >= 0) {
        const slashposition = this.urlins.lastIndexOf("/");
        this.urlins = this.urlins.substring(0, slashposition);
        this.urlins += "/embed";
        return true;
      } else {
        return false;
      }
    }
  }


}
