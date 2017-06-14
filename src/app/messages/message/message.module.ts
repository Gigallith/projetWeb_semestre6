import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MessageComponent } from "./message.component";
import {SafeResourceUrl} from "../../../shared/pipes/SafeResourceUrl.pipe";

@NgModule({
  declarations: [
    MessageComponent,
    SafeResourceUrl
  ],
  imports: [
    CommonModule
  ],
  exports: [MessageComponent],
  providers: []
})
export class MessageModule { }
