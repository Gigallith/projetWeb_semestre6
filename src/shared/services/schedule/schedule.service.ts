import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {URLSERVER} from "../../constants/urls";
import {MessageModel} from "shared/models/MessageModel";
import {MessageService} from "../message/message.service";

@Injectable()
export class ScheduleService {

  private url : string;

  private monthOffset : number = 1;

  constructor() {
    this.url = URLSERVER;
  }

  public scheduleMessage(message : MessageModel, messageService : MessageService, path : string) {
    let tmp_array = message.content.split(" ");

    if (this.isCommandToSchedule(tmp_array)){

      let date : Date = this.generateDate(tmp_array[2], tmp_array[3]);

      let message_to_send : string = this.extractMessage(tmp_array);

      message.content = message_to_send;

      messageService.sendMessage(path, message, date);

    }
  }

  private generateDate(day: string, hour: string) : Date{

    let array_day = day.split("/");
    let array_hour = hour.split(":");

    let day_wanted = Number(array_day[0]);
    let month_wanted = Number(array_day[1]) - this.monthOffset;
    let year_wanted = Number(array_day[2]);

    let hour_wanted = Number(array_hour[0]);
    let minute_wanted = Number(array_hour[1]);
    let second_wanted = Number(array_hour[2]);

    return new Date(year_wanted, month_wanted, day_wanted, hour_wanted, minute_wanted, second_wanted);
  }

  private isCommandToSchedule(tmp_array: string[]) : boolean {

    let day_date : string = tmp_array[2];
    let hour_date : string = tmp_array[3];

    return (tmp_array.length >= 5 && day_date.length == 10 && hour_date.length == 8);

  }

  private extractMessage(tmp_array: string[]) : string{

    let translateText : string = "";

    for (let i = 4; i < tmp_array.length; i++){
      translateText = translateText + tmp_array[i];

      if (i != (tmp_array.length - 1)){
        translateText = translateText + " ";
      }
    }

    return translateText;
  }
}
