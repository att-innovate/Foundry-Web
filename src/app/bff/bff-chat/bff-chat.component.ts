import { Component, OnInit, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { AnalyticsService } from '../../bff/services/analytics.service';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { BotService, IAnswear } from '../services/bot.service';
import { UiType } from '../enums/ui-type.enum';

@Component({
  selector: 'bff-chat',
  templateUrl: './bff-chat.component.html',
  styleUrls: ['./bff-chat.component.css']
})
export class BffChatComponent implements OnInit {
  @Input() team = 'bff';
  @Input() user: any = { firstName: "guest" }
  @Input() sessionid: string;
  @Input() network: string;

  @ViewChild('myRange') myRange: ElementRef;
  @ViewChild('inp') inp: ElementRef;
  @ViewChild('bffmain') bffmain: ElementRef;
  @ViewChild('chatWindow') chatWindow: ChatWindowComponent;
  @ViewChild('mask') mask: ElementRef;

  @Output() bffEmitter: EventEmitter<any> = new EventEmitter();
  @Output() onhelp: EventEmitter<any> = new EventEmitter();

  rate = 0;
  enabled: boolean = true;
  helpclicked: boolean = false;
  commenttext: string;
  isOpen: boolean;
  chatlist: any[] = [];
  currentAnswear: IAnswear;
  multiselected: string[] = [];

  constructor(private analyticsService: AnalyticsService, private botService: BotService) {

  }

  ngOnInit() {
    console.log('BFF Init');
    this.botService.botAnswer$.subscribe(answer => {
      this.currentAnswear = answer;
      if (answer) {
        setTimeout(() => {
          this.showNextMessage(answer)
        }, 50)
      }
    })
  }

  reset() {
    this.chatlist = [];
    this.botService.reset();
  }

  onmouseOver() {
    if (!this.isOpen) {
      this.isOpen = true;
      setTimeout(() => {

        if (this.mask) this.mask.nativeElement.style.opacity = "0.4";
        if (this.inp) this.inp.nativeElement.style.display = "inline";
      }, 150);
      this.bffmain.nativeElement.style.width = "350px";
      // this.bffmain.nativeElement.style.height = "300px";
      this.bffmain.nativeElement.style["border-radius"] = "30px";
      setTimeout(() => {
        if (this.inp) this.inp.nativeElement.focus();
        if (this.chatWindow) this.chatWindow.open();
      }, 500);
    }
  }

  onkeyup(event: any) {
    if (event.key == "Enter") {
      this.onInputClick();
    }
  }

  onInputClick() {
    this.commenttext = this.inp ? this.inp.nativeElement.value : "";

    this.handleUserInput(this.currentAnswear, this.commenttext);

    this.commenttext = "";
    this.inp.nativeElement.value = "";
  }

  onSlideChange(event) {
    let num: number = parseInt(this.myRange.nativeElement.value);
    let range: string = this.myRange.nativeElement.value;

    let option = this.currentAnswear.options.find(a => a.selectOn.indexOf(num) != -1);
    let index = option ? this.currentAnswear.options.indexOf(option) : 0;

    this.handleUserInput(this.currentAnswear, range, index);
  }

  butnClick(answear: IAnswear) {
    this.handleUserInput(answear);
  }

  multiSelectDoneClick(answear: IAnswear) {
    this.handleUserInput(answear, this.multiselected.join(", "));
  }

  handleUserInput(answear: IAnswear, showReply: string = "", nextByIndex: number = 0) {
    let reply = showReply ? showReply : answear.title;

    if (answear.label) {
      this.botService.addUserIput(answear.label, reply);
    }

    this.currentAnswear = answear;

    this.addToChatList(reply);
    this.getNextBotAction(nextByIndex);
  }

  addToChatList(txt: string, isBot: boolean = false, options: any = null, uitype: number = null) {
    if (txt) {
      this.chatlist.push(
        {
          type: isBot ? 'bot' : 'human',
          message: txt,
          options: options,
          uitype: uitype
        });

      this.chatWindow.scrollToBottom();
    }
  }

  showNextMessage(answear: IAnswear) {
    this.commenttext = "";
    this.currentAnswear = answear;

    let message: string = answear.title;

    this.botService.chatHistory.forEach(a => {
      message = message.replace(`#${a.label}`, this.botService.getUserInput(a.label));
    })

    if (answear) {
      this.addToChatList(message, answear.isBot, answear.payload, answear.uitype);
    }

    if (this.currentAnswear.uitype == UiType.TEXT) {

      setTimeout(() => {
        if (this.inp) this.inp.nativeElement.focus();
      }, 200);
    }
  }

  getNextBotAction(byIndex: number = 0) {
    if (this.currentAnswear.save) {
      this.saveFeedback();
    }

    if (!this.currentAnswear.end) {
      setTimeout(() => {
        this.showNextMessage(this.currentAnswear.options[byIndex]);
      }, 500);
    } else {
      this.reset();
    }
  }

  saveFeedback() {
    let message: string = this.botService.getUserInput("feedback");
    let type: string = this.botService.getUserInput("type");

    let severity: string = this.botService.getUserInput("severity");
    let severityStr: string = "";
    switch (severity) {
      case "1":
      case "2":
        severityStr = ", minor"
        break;
      case "3":
        severityStr = ", important"
        break;
      case "4":
      case "5":
        severityStr = ", urgent"
        break;
    }

    if (message) {
      this.analyticsService.postFeedbackLog(type, message, `bff, ${type} ${severityStr}`);
    }
  }


  onHelp() {
    this.onhelp.emit();
    this.helpclicked = true;
    this.close();
  }

  onmaskClick() {
    this.close();
  }

  close() {

    if (this.inp) this.inp.nativeElement.value = '';
    this.commenttext = '';

    if (this.bffmain) {
      this.bffmain.nativeElement.style.width = "50px";
      this.bffmain.nativeElement.style["border-radius"] = "18px";
    }
    if (this.chatWindow) this.chatWindow.close();
    this.isOpen = false;
  }

  onstartOver() {
    this.reset();
  }


  chkboxSelected(item) {
    console.log("select " + item);
    if (this.multiselected.indexOf(item) != -1) {
      this.multiselected = this.multiselected.filter(a => a != item);
    } else {
      this.multiselected.push(item);
    }

  }

  isChkboxSelected(item) {
    if (this.multiselected.indexOf(item) != -1) {
      return true
    }

    return false;
  }

}
