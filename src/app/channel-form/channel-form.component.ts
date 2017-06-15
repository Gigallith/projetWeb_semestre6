import {Component, OnInit} from "@angular/core";
import {ChannelModel} from "../../shared/models/ChannelModel";
import {ChannelService} from "../../shared/services/channel/channel.service";
import {ChannelListComponent} from "../channels/channel-list/channel-list.component";

@Component({
  selector: "app-channel-form",
  templateUrl: "./channel-form.component.html",
  styleUrls: ["./channel-form.component.css"]
})
export class ChannelFormComponent implements OnInit {

  public channel: ChannelModel;
  private route: string;

  constructor(private channelService: ChannelService) {
    this.channel = new ChannelModel(1, "", "", "");
    this.route = "";
  }

  ngOnInit() {
  }

  createChannel() {
    this.channelService.createChannel(this.route, this.channel);

    ChannelListComponent.update();
  }


}
