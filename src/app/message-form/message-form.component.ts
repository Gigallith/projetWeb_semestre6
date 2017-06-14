import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../shared/services";
import {MessageModel} from "../../shared/models/MessageModel";
import {MessageListComponent} from "../messages/message-list/message-list.component";
import {TranslateService} from "../../shared/services/translate/translate.service";
import {WeatherService} from "../../shared/services/weather/weather.service";
import {ScheduleService} from "../../shared/services/schedule/schedule.service";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

  public message: MessageModel;
  private route: string;

  constructor(private messageService: MessageService, private translateService: TranslateService, private weatherService: WeatherService, private schedulerService : ScheduleService) {
    this.message = new MessageModel(1, "", "");
    this.route = "/messages";
  }


  ngOnInit() {
  }

  /**
   * Fonction pour envoyer un message.
   * L'envoi du message se fait à travers la methode sendMessage du service MessageService.
   * Cette méthode prend en paramètre la route pour envoyer un message (:id/messages avec id un entier correspondant à l'id du channel)
   * ainsi que le message à envoyer. Ce dernier correspond à l'objet MessageModel que l'utilisateur rempli à travers l'input.
   */
  sendMessage() {
    let tmp_array = this.message.content.split(" ")[0];

    switch (tmp_array) {
      case "/trad":
        this.translateService.translateMessage(this.message, this.messageService, MessageListComponent.channelID + this.route);
        break;
      case "/schedule":
        this.schedulerService.scheduleMessage(this.message, this.messageService, MessageListComponent.channelID + this.route);
        break;
      case "/meteo":
        this.weatherService.sendWeather(this.message, this.messageService, MessageListComponent.channelID + this.route);
        break;
      default:
        this.messageService.sendMessage(MessageListComponent.channelID + this.route, this.message);
        break;
    }
    this.resetFields();
  }

  private resetFields() {
    this.message.content = "";

    MessageListComponent.notifyChange(MessageListComponent.channelID);
  }
}
