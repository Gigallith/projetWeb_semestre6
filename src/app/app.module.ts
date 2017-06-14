import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";

import { MessageComponent, MessageListComponent } from "./messages";
import { MessageFormComponent } from "./message-form";
import { MessageService } from "../shared/services/message/message.service";
import { ChannelsComponent } from "./channels/channel/channels.component";
import { ChannelListComponent } from "./channels/channel-list/channel-list.component";
import {ChannelService} from "../shared/services/channel/channel.service";
import { ChannelFormComponent } from "./channel-form/channel-form.component";
import {TranslateService} from "../shared/services/translate/translate.service";
import {SafeResourceUrl} from "../shared/pipes/SafeResourceUrl.pipe";


@NgModule({
  declarations: [
    AppComponent,
    MessageFormComponent,
    MessageListComponent,
    MessageComponent,
    ChannelsComponent,
    ChannelListComponent,
    ChannelFormComponent,
    SafeResourceUrl
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    MessageService,
    ChannelService,
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
