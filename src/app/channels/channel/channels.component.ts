import {Component, Input, OnInit} from "@angular/core";
import {ChannelModel} from "../../../shared/models/ChannelModel";
import {MessageListComponent} from "app/messages";
import {MessageService} from "../../../shared/services/message/message.service";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@Component({
  selector: "app-channels",
  templateUrl: "./channels.component.html",
  styleUrls: ["./channels.component.css"]
})
export class ChannelsComponent implements OnInit {

  @Input() channel: ChannelModel;

  constructor(private messageService: MessageService, private channelservice: ChannelService) {
    this.channel = new ChannelModel(0);
  }

  ngOnInit() {
  }

  switchChannel() {
    this.messageService.setChannelID(this.channel.id);
    this.channelservice.changeChatTitre(this.channel.name);
  }

}
