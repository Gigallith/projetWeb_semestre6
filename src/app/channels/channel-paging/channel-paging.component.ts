import {Component, OnInit} from "@angular/core";
import {THREADPAGE} from "../../../shared/constants/urls";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@Component({
  selector: "app-channel-paging",
  templateUrl: "./channel-paging.component.html",
  styleUrls: ["./channel-paging.component.css"]
})
export class ChannelPagingComponent implements OnInit {

  private route: string;

  constructor(private channelService: ChannelService) {
    this.route = THREADPAGE;

  }

  /**
   * Method used to switch to the previous channel page
   */
  prevChannelPage() {
    if (this.channelService.getPagenum() !== 0) {
      this.channelService.decrPagenum();
      this.channelService.extractAndUpdateChannelList();
    }
  }

  /**
   * Method used to switch to the next channel page
   */
  nextChannelPage() {
    if (!this.channelService.isEmptyList()) {
      this.channelService.incrPagenum();
      this.channelService.extractAndUpdateChannelList();
    }
  }


  ngOnInit() {
  }


}
