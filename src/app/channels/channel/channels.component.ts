import {Component, Input, OnInit} from '@angular/core';
import {ChannelModel} from "../../../shared/models/ChannelModel";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  @Input() channel : ChannelModel;

  constructor() {
    this.channel = new ChannelModel(0);
  }

  ngOnInit() {
  }

}