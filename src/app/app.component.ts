import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {ChannelService} from "../shared/services/channel/channel.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  title: String = "Chat";
  public title2: string;

  constructor(private channelservice: ChannelService) {
    this.channelservice.titre$.subscribe(titre => {
      this.title = titre;
    }, error => {
      console.log("error: " + error); });
    this.title2 = "Channels";
    Observable.create();
  }
}
