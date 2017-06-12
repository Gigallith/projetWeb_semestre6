import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { MessageFormComponent } from "./message-form.component";
import { MessageService } from "../../shared/services/message/message.service";

@NgModule({
  declarations: [
    MessageFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MessageFormComponent],
  providers: [MessageService]
})
export class MessageFormModule { }
