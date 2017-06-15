import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, RequestOptions, Response, Headers} from "@angular/http";

import {URLTRANSLATE, URLWEATHER, WEATHERKEY} from "../../constants/urls";
import {MessageService} from "../message/message.service";
import {MessageModel} from "../../models/MessageModel";

@Injectable()
export class WeatherService {

  private url: string;
  private key: string;

  constructor(private http: Http) {
    this.url = URLWEATHER;
    this.key = WEATHERKEY;
  }

  public sendWeather(message: MessageModel, messageService: MessageService, path: string) {
    let tmp_array = message.content.split(" ");

    if (this.isCommandToWeather(tmp_array)) {

      this.sendWeatherRequest(tmp_array).subscribe((response) => {

        const user_name  : string = message.from;

        let tmp_content = "Voici la météo de " + response.json().name + ": \n" +
          "Température : " + response.json().main.temp + "°C \n" +
            //"elles varient entre : " +response.json().main.temp_min + "°C et " + response.json().main.temp_max + "°C \n" +
          "Vent : " + response.json().wind.speed + "m/s \n" +
          "Humidité : " + response.json().main.humidity + "% \n";


        let tmp_message = message;
        tmp_message.content = tmp_content;
        tmp_message.from = "mrmeteo";

        messageService.sendMessage(path, tmp_message);

        message.from = user_name;
        message.content = "";
      });
    }
  }

  private sendWeatherRequest(tmp_array: string[]): Observable<Response> {
    let cityName: string = tmp_array[1];
    cityName = cityName.replace(/" "/g,"");

    let tmp_link: string = this.url + "data/2.5/weather?q=" + cityName + "&units=metric&appid=" + this.key;
    return this.http.get(tmp_link);
  }

  private isCommandToWeather(tmp_array: string[]): boolean {

    return (tmp_array.length >= 2);
  }
}
