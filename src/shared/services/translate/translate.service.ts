import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, RequestOptions, Response, Headers} from "@angular/http";

import {URLTRANSLATE} from "../../constants/urls";
import {MessageService} from "../message/message.service";
import {MessageModel} from "../../models/MessageModel";

@Injectable()
export class TranslateService {

  private url : string;

  constructor(private http: Http){
    this.url = URLTRANSLATE;
  }

  public translateMessage(message : MessageModel, messageService : MessageService, path : string){
    let tmp_array = message.content.split(" ");

    if (this.isCommandToTranslate(tmp_array)){

      this.sendTranslateRequest(tmp_array).subscribe((response) => {

        const user_name  : string = message.from;

        let tmp_message = message;
        tmp_message.content = response.json().translationText;
        tmp_message.from = "translatebot";

        messageService.sendMessage(path, tmp_message);

        message.from = user_name;
        message.content = "";
      });
    }
  }

  private sendTranslateRequest(tmp_array: string[]) : Observable<Response>{
    let from : string = tmp_array[1];
    let to : string = tmp_array[2];
    let translateText : string = "";

    for (let i = 3; i < tmp_array.length; i++) {
      tmp_array[i] = tmp_array[i].replace(",", "%2C");
      translateText = translateText + tmp_array[i];

      if (i != (tmp_array.length - 1)){
        translateText = translateText + "%20";
      }
    }

    let tmp_link : string = this.url + "text=" + translateText + "&to=" + to + "&from=" + from;

    return this.http.get(tmp_link);
  }

  private isCommandToTranslate(tmp_array : string[]) : boolean{

    let from : string = tmp_array[1];
    let to : string = tmp_array[2];

    return (tmp_array.length > 3 && from.length == 2 && to.length == 2);
  }
}
