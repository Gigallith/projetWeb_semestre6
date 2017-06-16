import {Component, Input, OnInit} from "@angular/core";
import {ChannelModel} from "../../../shared/models/ChannelModel";
import {MessageService} from "../../../shared/services/message/message.service";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {MessageListComponent} from "../../messages/message-list/message-list.component";

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

  /**
   * Method used when the used click on a channel, to load the message contained in the wanted one
   * and update every data related to this change
   */
  switchChannel() {
    this.messageService.setChannelID(this.channel.id);
    this.channelservice.changeChatTitre(this.channel.name);
    MessageListComponent.max_page = 0;
  }

}
