import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {ChannelFormComponent} from "./channel-form.component";
import {ChannelService} from "../../shared/services/channel/channel.service";

@NgModule({
  declarations: [
    ChannelFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ChannelFormComponent],
  providers: [ChannelService]
})

export class ChannelFormModule {
}
