import {NgModule} from "@angular/core";
import {ChannelListComponent} from "./channel-list.component";
import {CommonModule} from "@angular/common";
import {ChannelModule} from "../channel/channels.module";
import {ChannelService} from "../../../shared/services/channel/channel.service";
@NgModule({
  declarations: [
    ChannelListComponent
  ],
  imports: [
    CommonModule,
    ChannelModule
  ],
  exports: [ChannelListComponent],
  providers: [ChannelService]
})

export class ChannelListModule { }
