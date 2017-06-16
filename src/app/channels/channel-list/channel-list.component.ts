import {Component, OnInit} from "@angular/core";
import {ChannelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {THREADPAGE} from "../../../shared/constants/urls";
import {Observable} from "rxjs/Observable";
import {MessageListComponent} from "../../messages/message-list/message-list.component";

@Component({
  selector: "app-channel-list",
  templateUrl: "./channel-list.component.html",
  styleUrls: ["./channel-list.component.css"]
})
export class ChannelListComponent implements OnInit {

  public static needToUpdate = false;
  public channelList: ChannelModel[];
  private route: string;

  public static update() {
    ChannelListComponent.needToUpdate = true;
  }

  constructor(private channelService: ChannelService) {
    this.route = THREADPAGE;

    Observable.interval(1000)
      .subscribe(() => {
        if (ChannelListComponent.needToUpdate) {
          this.updateList();
        }
      });

  }

  private updateList() {
    this.channelService.extractAndUpdateChannelList();
    this.channelService.channelList$.subscribe((channels) => {
      this.channelList = channels;
    });
    ChannelListComponent.needToUpdate = false;
  }



  ngOnInit() {
    this.updateList();
    this.channelService.getFirstChannel(THREADPAGE, 0);
  }




}
