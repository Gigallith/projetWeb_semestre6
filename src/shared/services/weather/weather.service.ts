import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";

import {URLWEATHER, WEATHERKEY} from "../../constants/urls";
import {MessageService} from "../message/message.service";
import {MessageModel} from "../../models/MessageModel";

@Injectable()
export class WeatherService {

  private url: string;
  private key: string;

  constructor(private http: Http, private messageService: MessageService) {
    this.url = URLWEATHER;
    this.key = WEATHERKEY;
  }

  /**
   * Method called when the user entered a message starting by "/meteo". It will test the command and
   * display the weather if the command is well formatted
   *
   * @param message the message the user entered
   * @param path the extension to send the request to the correct URL
   */
  public sendWeather(message: MessageModel, path: string) {
    const tmp_array = message.content.split(" ");

    if (this.isCommandToWeather(tmp_array)) {

      this.sendWeatherRequest(tmp_array).subscribe((response) => {

        const user_name: string = message.from;

        const tmp_content = "Voici la météo de " + response.json().name + ": \n" +
          "Temps : " + response.json().weather[0].description + "  ,\n" +
          "Température : " + response.json().main.temp + "°C, \n" +
          "Vent : " + response.json().wind.speed + "m/s, \n" +
          "Humidité : " + response.json().main.humidity + "% \n";


        const tmp_message = message;
        tmp_message.content = tmp_content;
        tmp_message.from = "mrmeteo";

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
  private sendWeatherRequest(tmp_array: string[]): Observable<Response> {
    let cityName: string = tmp_array[1];
    cityName = cityName.replace(/" "/g, "");

    const tmp_link: string = this.url + "data/2.5/weather?q=" + cityName + "&units=metric&lang=fr&appid=" + this.key;
    return this.http.get(tmp_link);
  }

  /**
   * Method used to check if the command entered is well formatted
   *
   * @param tmp_array the different part of the command entered
   * @returns {boolean} returns true if the command is valid. false otherwise
   */
  private isCommandToWeather(tmp_array: string[]): boolean {

    return (tmp_array.length >= 2);
  }
}
