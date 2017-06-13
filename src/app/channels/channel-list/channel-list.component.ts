import { Component, OnInit } from '@angular/core';
import {ChannelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {THREADPAGE} from "../../../shared/constants/urls";
import {Observable} from "rxjs";

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {

  public channelList: ChannelModel[];

  private start_page : number = 0;

  private route: string;

  constructor(private channelService: ChannelService) {
    this.route = THREADPAGE;
    Observable.interval(5000)
      .subscribe( () => {
        this.updateList();
      });
  }

  private updateList(){
    this.channelService.extractAndUpdateChannelList();
    this.channelService.channelList$.subscribe((channels) => this.channelList = channels);
  }

  ngOnInit() {
    this.updateList()
  }

}
