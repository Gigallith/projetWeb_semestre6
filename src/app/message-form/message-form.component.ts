import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../shared/services";
import {MessageModel} from "../../shared/models/MessageModel";
import {TranslateService} from "../../shared/services/translate/translate.service";
import {WeatherService} from "../../shared/services/weather/weather.service";
import {ScheduleService} from "../../shared/services/schedule/schedule.service";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

  public checkuser: boolean;
  public message: MessageModel;
  private route: string;

  constructor(private messageService: MessageService, private translateService: TranslateService,
              private weatherService: WeatherService, private schedulerService: ScheduleService) {
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
    this.checkuser = true;
    const tmp_array = this.message.content.split(" ")[0];
    switch (tmp_array) {
      case "/trad":
        this.translateService.translateMessage(this.message, this.messageService.getChannelID() + this.route);
        break;
      case "/schedule":
        this.schedulerService.scheduleMessage(this.message, this.messageService.getChannelID() + this.route);
        break;
      case "/meteo":
        this.weatherService.sendWeather(this.message, this.messageService.getChannelID() + this.route);
        break;
      default:
        this.messageService.sendMessage( this.messageService.getChannelID() + this.route, this.message);
        break;
    }

    this.checkuser = /^[a-z]+$/g.exec(this.message.from) == null;

    this.resetFields();
  }

  /**
   * Method used to clear the message field after the user send a message
   */
  private resetFields() {
    this.message.content = "";
  }
}
