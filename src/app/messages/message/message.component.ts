import {Component, Input, OnInit} from "@angular/core";

import {MessageModel} from "../../../shared/models/MessageModel";

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

  /**
   * Method that test the content of a message and returns if it contains a link that refer to a youtube video
   * If it does, it calls method extractAndSetLink to define urlyb
   *
   * @returns {boolean} return true if the message contains a youtube viedo link. false otherwise
   */
  checkyt(): boolean {

    if (this.message.content != null) {
      const regex = /^((http|https):\/\/)(www\.)(youtube\.com\/|youtu\.be\/)(v\/|watch\?v=|).+$/;
      const tabMessage = this.message.content.split(" ");

      for (let i = 0; i < tabMessage.length; i++) {
        if (tabMessage[i].match(regex)) {
          this.urlyb = tabMessage[i];

          this.extractAndSetLink();

          return true;
        }
      }
      return false;
    }
  }

  /**
   * Convert youtube link source to a embed youtube link.
   */
  extractAndSetLink() {
    const smallLink = /^.*youtu\.be.*$/;
    const mediumLink = /^.*\/v\/.*$/;
    const largeLink = /^.*watch\?v=.*$/;

    if (this.urlyb.match(mediumLink)) {
      this.urlyb = this.urlyb.replace("v/", "embed/");
    } else if (this.urlyb.match(largeLink)) {
      this.urlyb = this.urlyb.replace("watch?v=", "embed/");
    } else if (this.urlyb.match(smallLink)) {
      this.urlyb = this.urlyb.replace("youtu.be/", "youtube.com/embed/");
    }
  }


  /**
   * Method that test the content of a message and returns if it contains a link that refer to a instagram post
   * If it does, urltw is defined by the link of instagram post
   *
   * @returns {boolean} return true if the message contains a instagram link. false otherwise
   */
  checkins(): boolean {
    if (this.message.content != null) {
      const regex = /^((http|https):\/\/)(www.)(instagram.com|instagr.am)\/([A-Za-z0-9-_\/=&?]+)$/;
      const tabMessage = this.message.content.split(" ");

      for (let i = 0; i < tabMessage.length; i++){
        if (tabMessage[i].match(regex)){
          this.urlins = tabMessage[i].split("?")[0];

          if (!(this.urlins.slice(-1) === "/")) {
            this.urlins = this.urlins + "/";
          }
          this.urlins = this.urlins + "embed";

          return true;
        }
      }
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
      const regex = /^((http|https):\/\/)(www\.)[a-zA-Z-0-9.].+(.png|.jpeg|.jpg)$/;
      const tabMessage = this.message.content.split(" ");

      for (let i = 0; i < tabMessage.length; i++) {
        if (tabMessage[i].match(regex)) {
          this.urlImg = tabMessage[i];
          return true;
        }
      }
      return false;
    }
  }


  /**
   * Method that test the content of a message and returns if it contains a link that refer to a tweet
   * If it does, urltw is defined by link of twitter post
   *
   * @returns {boolean} return true if the message contains a tweet link. false otherwise
   */
  checktw(): boolean {
    if (this.message.content != null) {
      const regex = /^http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_\/]+)$/;
      const tabMessage = this.message.content.split(" ");

      for (let i = 0; i < tabMessage.length; i++) {
        if (tabMessage[i].match(regex)) {
          this.urltw = "http://twitframe.com/show?url=" + tabMessage[0];
          return true;
        }
      }
      return false;
    }
  }
}
