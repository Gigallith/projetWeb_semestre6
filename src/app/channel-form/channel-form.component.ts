import {Component, OnInit} from "@angular/core";
import {ChannelModel} from "../../shared/models/ChannelModel";
import {ChannelService} from "../../shared/services/channel/channel.service";

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

  /**
   * Method called when we wants to create a new channel
   */
  createChannel() {
    this.channelService.createChannel(this.route, this.channel);
    this.resetFields();
  }

  /**
   * Method used to clear the message field after the user send a message
   */
  private resetFields() {
    this.channel.name = "";
  }
}
