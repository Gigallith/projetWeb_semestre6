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

  private isCommandToTranslate(tmp_array: string[]): boolean {
    const from: string = tmp_array[1];
    const to: string = tmp_array[2];

    const regexCountry = new RegExp('^[A-Za-z]{2}$');

    return (tmp_array.length > 3 && regexCountry.test(from) && regexCountry.test(to));
  }
}
