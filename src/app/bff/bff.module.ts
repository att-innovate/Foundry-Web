import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BffChatComponent } from './bff-chat/bff-chat.component';
import { MessageComponent } from './message/message.component';
import { AnalyticsService } from '../bff/services/analytics.service';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BotService } from './services/bot.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule
  ],
  declarations: [BffChatComponent, MessageComponent, ChatWindowComponent],
  providers: [AnalyticsService, BotService],
  exports: [BffChatComponent],
})
export class BffModule { }
