import {Component, OnInit} from '@angular/core';
import {ChannelModel} from "../../../shared/models/ChannelModel";
import {THREADPAGE} from "../../../shared/constants/urls";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {MessageService} from "../../../shared/services/message/message.service";

@Component({
  selector: 'app-channel-paging',
  templateUrl: './channel-paging.component.html',
  styleUrls: ['./channel-paging.component.css']
})
export class ChannelPagingComponent implements OnInit {

  public channelList: ChannelModel[];
  private route: string;

  constructor(private channelService: ChannelService, private messageService: MessageService) {
    this.route = THREADPAGE;

  }

  prevChannelPage() {
     if (this.channelService.getPagenum() != 0) {
      this.channelService.decrPagenum();
      this.channelService.extractAndUpdateChannelList();
    }
  }

  nextChannelPage() {
      this.channelService.incrPagenum();
      this.channelService.extractAndUpdateChannelList();
  }

  updateList() {
    this.channelService.extractAndUpdateChannelList();
    this.channelService.channelList$.subscribe((channels) => {
      this.channelList = channels;
      this.messageService.setChannelID(channels[0].id);

    });
  }

  ngOnInit() {
    this.updateList();
  }


}
