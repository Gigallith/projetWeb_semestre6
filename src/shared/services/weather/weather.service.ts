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

  constructor(private http: Http, private messageService: MessageService) {
    this.url = URLWEATHER;
    this.key = WEATHERKEY;
  }

  /**
   * Fonction sendWeather
   * Génère le message donnant la météo et envoie un message pour l'afficher dans le chat
   * @param message
   * @param path
   */
  public sendWeather(message: MessageModel, path: string) {
    const tmp_array = message.content.split(" ");

    if (this.isCommandToWeather(tmp_array)) {

      this.sendWeatherRequest(tmp_array).subscribe((response) => {

        const user_name: string = message.from;

        // let element = document.createElement("div");

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
   * Fonction sendWeatherRequest
   * Génére l'url du json qui contient les info de la météo
   * @param tmp_array
   * @returns {Observable<Response>}
   */
  private sendWeatherRequest(tmp_array: string[]): Observable<Response> {
    let cityName: string = tmp_array[1];
    cityName = cityName.replace(/" "/g, "");

    const tmp_link: string = this.url + "data/2.5/weather?q=" + cityName + "&units=metric&lang=fr&appid=" + this.key;
    return this.http.get(tmp_link);
  }

  /**
   * Fonction isCommandToWeather
   * Permet de s'assurer que la comande pour la météo posséde un paramètre
   * @param tmp_array
   * @returns {boolean}
   */
  private isCommandToWeather(tmp_array: string[]): boolean {

    return (tmp_array.length >= 2);
  }
}
