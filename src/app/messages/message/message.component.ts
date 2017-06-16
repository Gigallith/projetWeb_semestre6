import {Component, Input, OnInit} from "@angular/core";

import {MessageModel} from "../../../shared/models/MessageModel";
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {

  @Input() message: MessageModel;
  private urlyb: string;
  private urlins: string;
  private urlImg: string;
  private urltw: string;

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
  ngOnInit() {
  }

  checkyt(): boolean {

    if (this.message.content != null) {
      const regex = /^((http|https):\/\/)(www\.)(youtube\.com\/|youtu\.be\/)(v\/|watch\?v=|).+$/;
      const tabMessage = this.message.content.split(" ");

      for (let i = 0; i < tabMessage.length; i++){
        if (tabMessage[i].match(regex)){
          this.urlyb = tabMessage[i];

          this.extractAndSetLink();

          return true;
        }
      }
      return false;
    }
  }

  extractAndSetLink(){
    const smallLink = /^.*youtu\.be.*$/;
    const mediumLink = /^.*\/v\/.*$/;
    const largeLink = /^.*watch\?v=.*$/;

    if (this.urlyb.match(mediumLink)){
      this.urlyb = this.urlyb.replace("v/", "embed/");
    } else if (this.urlyb.match(largeLink)){
      this.urlyb = this.urlyb.replace("watch?v=", "embed/");
    } else if (this.urlyb.match(smallLink)){
      this.urlyb = this.urlyb.replace("youtu.be/", "youtube.com/embed/");
    }
  }


  checkins(): boolean {
    const http_str = "https://www.instagram.com";

    if (this.message.content != null && this.message.content.includes(http_str)) {
      const strposition = this.message.content.indexOf(http_str);
      this.urlins = this.message.content.substr(strposition).split(" ")[0];
      if (this.urlins.includes("?") || this.urlins.charAt((this.urlins.length) - 1) === "/") {
        const slashposition = this.urlins.lastIndexOf("/");
        this.urlins = this.urlins.substring(0, slashposition); }
      this.urlins += "/embed";
      return true;
    } else {
      return false;
    }
  }

  /**
   * Method that test the content of a message and returns if it contains a link that refer to an image
   *
   * @returns {boolean} return true if the message contains an image url. false otherwise
   */
  checkImg(): boolean {
    if (this.message.content != null) {
      const regex = /^((http|https):\/\/)?(www\.)?[a-zA-Z-0-9.].+(.png|.jpeg|.jpg)$/;
      const tabMessage = this.message.content.split(" ");

      for (let i = 0; i < tabMessage.length; i++){
        if (tabMessage[i].match(regex)){
          this.urlImg = tabMessage[i];
          return true;
        }
      }
      return false;
    }
  }

  checktw(): boolean {
    const http_str = "https://twitter.com";
    if (this.message.content != null && this.message.content.includes(http_str)) {
      const strposition = this.message.content.indexOf(http_str);
      const url = this.message.content.substr(strposition).split(" ")[0];
      this.urltw = "http://twitframe.com/show?url=" + url;
      return true;
    } else {
      return false;
    }
  }
}
