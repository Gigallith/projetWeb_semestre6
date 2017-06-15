import {Injectable} from "@angular/core";
import {URLSERVER} from "../../constants/urls";
import {MessageModel} from "shared/models/MessageModel";
import {MessageService} from "../message/message.service";

@Injectable()
export class ScheduleService {

  private static min_num_arg = 5;

  private url: string;

  private monthOffset = 1;

  constructor(private messageService : MessageService) {
    this.url = URLSERVER;
  }

  /**
   * Method called when the "/schedule" command is entered. It will extract all the data contained in the arguments entered
   * by the user and send a message if the command is well formed
   *
   * @param message the command entered by the user
   * @param path the path needed to post the me
   */
  public scheduleMessage(message: MessageModel, path: string) {
    const tmp_array = message.content.split(" ");

    if (this.isCommandToSchedule(tmp_array)) {

      const date: Date = this.generateDate(tmp_array[2], tmp_array[3]);

      message.content = this.extractMessage(tmp_array);
      message.id = Number(tmp_array[1]);

      this.messageService.sendMessage(path, message, date);

    }
  }

  /**
   * Method that extract the parameters entered and generate the date that the user chose for the message
   *
   * @param day the day entered by the user
   * @param hour the hour entered by the user
   * @returns {Date} the date extracted from the arguments entered
   */
  private generateDate(day: string, hour: string): Date {

    const array_day = day.split("/");
    const array_hour = hour.split(":");

    const day_wanted = Number(array_day[0]);
    const month_wanted = Number(array_day[1]) - this.monthOffset;
    const year_wanted = Number(array_day[2]);

    const hour_wanted = Number(array_hour[0]);
    const minute_wanted = Number(array_hour[1]);
    const second_wanted = Number(array_hour[2]);

    return new Date(year_wanted, month_wanted, day_wanted, hour_wanted, minute_wanted, second_wanted);
  }

  /**
   * Method that test the command and returns true if the command entered is correct
   *
   * @param tmp_array the list of arguments entered by the user
   * @returns true if the command is well formed. false otherwise
   */
  private isCommandToSchedule(tmp_array: string[]): boolean {

    const regexRoom = new RegExp("^[0-9]{1,}$");
    const regexDay = new RegExp("^([0-9]{2}\/){2}[0-9]{4}$");
    const regexHour = new RegExp("^([0-9]{2}:){2}[0-9]{2}$");

    const room = tmp_array[1];
    const day_date = tmp_array[2];
    const hour_date = tmp_array[3];

    return (tmp_array.length >= ScheduleService.min_num_arg && regexRoom.test(room) && regexDay.test(day_date) && regexHour.test(hour_date));
  }

  /**
   * Method that return the string entered by the user
   *
   * @param tmp_array the list of arguments entered by the user
   * @returns {string} the string entered by the user that he wants to schedule
   */
  private extractMessage(tmp_array: string[]): string {

    let translateText = "";

    for (let i = 4; i < tmp_array.length; i++) {
      translateText = translateText + tmp_array[i];

      if (i !== (tmp_array.length - 1)) {
        translateText = translateText + " ";
      }
    }

    return translateText;
  }
}
