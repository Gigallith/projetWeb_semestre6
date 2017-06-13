import {NgModule} from "@angular/core";
import {ChannelsComponent} from "./channels.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations:  [
    ChannelsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ChannelsComponent],
  providers: []
})

export class ChannelModule { }
