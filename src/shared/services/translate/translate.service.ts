import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";

import {URLTRANSLATE} from "../../constants/urls";
import {MessageService} from "../message/message.service";
import {MessageModel} from "../../models/MessageModel";

@Injectable()
export class TranslateService {

  private url: string;

  constructor(private http: Http, private messageService: MessageService) {
    this.url = URLTRANSLATE;
  }

  /**
   * Method called when the user entered a message starting by "/trad". It will test the command and
   * do the translation if the command is well formatted
   *
   * @param message the message the user entered
   * @param path the extension to send the request to the correct URL
   */
  public translateMessage(message: MessageModel, path: string) {
    const tmp_array = message.content.split(" ");

    if (this.isCommandToTranslate(tmp_array)) {

      this.sendTranslateRequest(tmp_array).subscribe((response) => {

        const user_name: string = message.from;

        const tmp_message = message;
        tmp_message.content = response.json().translationText;
        tmp_message.from = "translatebot";

        this.messageService.sendMessage(path, tmp_message);

        message.from = user_name;
        message.content = "";
      });
    }
  }

  /**
   * Method used when the command is valid. It will send a request to the needed API and returns the response received
   *
   * @param tmp_array the different part of the command entered
   * @returns {Observable<Response>} the response sent by the API after the GET request
   */
  private sendTranslateRequest(tmp_array: string[]): Observable<Response> {
    const from: string = tmp_array[1];
    const to: string = tmp_array[2];
    let translateText = "";

    for (let i = 3; i < tmp_array.length; i++) {
      tmp_array[i] = tmp_array[i].replace(",", "%2C");
      translateText = translateText + tmp_array[i];

      if (i !== (tmp_array.length - 1)) {
        translateText = translateText + "%20";
      }
    }

    const tmp_link: string = this.url + "text=" + translateText + "&to=" + to + "&from=" + from;

    return this.http.get(tmp_link);
  }

  /**
   * Method used to check if the command entered is well formatted
   *
   * @param tmp_array the different part of the command entered
   * @returns {boolean} returns true if the command is valid. false otherwise
   */
  private isCommandToTranslate(tmp_array: string[]): boolean {
    const from: string = tmp_array[1];
    const to: string = tmp_array[2];

    const regexCountry = new RegExp("^[A-Za-z]{2}$");

    return (tmp_array.length > 3 && regexCountry.test(from) && regexCountry.test(to));
  }
}
