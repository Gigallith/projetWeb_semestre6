import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MessageListComponent } from "./message-list.component";
import { MessageModule } from "../message";
import { MessageService } from "../../../shared/services";

@NgModule({
  declarations: [
    MessageListComponent
  ],
  imports: [
    CommonModule,
    MessageModule
  ],
  exports: [MessageListComponent],
  providers: [MessageService]
})
export class MessageListModule { }
