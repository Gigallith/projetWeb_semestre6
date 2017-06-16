import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ChannelModule} from "../channel/channels.module";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {ChannelPagingComponent} from "./channel-paging.component";
@NgModule({
  declarations: [
    ChannelPagingComponent
  ],
  imports: [
    CommonModule,
    ChannelModule
  ],
  exports: [ChannelPagingComponent],
  providers: [ChannelService]
})

export class ChannelPagingModule { }
