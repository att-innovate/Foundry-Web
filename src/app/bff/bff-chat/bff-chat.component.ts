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
  rate = 0;
  @Input() team = 'bff';
  @Input() user: any;
  @Input() sessionid: string;
  @Input() network: string;

  enabled: boolean = true;
  @ViewChild('myRange') myRange: ElementRef;
  @ViewChild('inp') inp: ElementRef;
  @ViewChild('bffmain') bffmain: ElementRef;
  @ViewChild('chatWindow') chatWindow: ChatWindowComponent;
  @ViewChild('mask') mask: ElementRef;
  @Output() bffEmitter: EventEmitter<any> = new EventEmitter();
  @Output() onhelp: EventEmitter<any> = new EventEmitter();

  helpclicked: boolean = false;
  commenttext: string;

  isOpen: boolean;
  chatlist: any[] = [];

  emotionSelected: boolean;
  currentAnswear: IAnswear;
  multiselected: string[] = []

  constructor(private analyticsService: AnalyticsService, private botService: BotService) {

  }

  ngOnInit() {
    console.log('BFF Init');
    this.user
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

  onInputClick(/*answear:IAnswear*/) {
    this.commenttext = this.inp ? this.inp.nativeElement.value : "";
    var currentLabel = this.currentAnswear.label;
    if (currentLabel == "person") {
      this.botService.addUserIput("personName", this.commenttext);
    } else if (currentLabel == "startup") {
      this.botService.addUserIput("startupName", this.commenttext);
    }
    //this.botService.addUserIput('feedback', this.commenttext);
    //this.botService.addUserIput('personName', this.commenttext);
    //this.botService.addUserIput('startupName', this.commenttext);

    this.addToChatList(this.commenttext);

    this.commenttext = "";
    this.inp.nativeElement.value = "";
    this.getNextBotAction();
  }

  onkeyup(event: any) {
    if (event.key == "Enter") {
      this.onInputClick();
    }
  }

  onSlideChange(event) {
    let num: number = parseInt(this.myRange.nativeElement.value);
    let range: string = this.myRange.nativeElement.value;

    this.botService.addUserIput('severity', range);

    this.addToChatList(range);

    //let index: number = num > 3 ? 1 : 0;

    let option = this.currentAnswear.options.find(a => a.selectOn.indexOf(num) != -1);
    let index = option ? this.currentAnswear.options.indexOf(option) : 0;

    this.getNextBotAction(index);
  }

  butnClick(answear: IAnswear) {

    if (answear.label == "type") {
      this.botService.addUserIput("type", answear.title);
    } /*else if (answear.label == "person") {
      this.botService.addUserIput("personName", answear.title);
    } else if (answear.label == "startup") {
      this.botService.addUserIput("startupName", answear.title);
    }*/
    this.currentAnswear = answear
    //this.showNextMessage(answear);
    this.addToChatList(answear.title);
    this.getNextBotAction();
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
    message = message.replace('#user', this.user.firstName);
    message = message.replace('#feedback', this.botService.getUserInput('feedback'));
    message = message.replace('#severity', this.botService.getUserInput('severity'));
    message = message.replace('#personName', this.botService.getUserInput('personName'));
    message = message.replace('#startupName', this.botService.getUserInput('startupName'));
    if (answear) {
      this.addToChatList(message, answear.isBot, answear.payload, answear.uitype);
    }

    if (this.currentAnswear.uitype == UiType.TEXT) {

      setTimeout(() => {
        if (this.inp) this.inp.nativeElement.focus();
        //debugger;
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

  /* emotionClick(value) {
    this.emotionSelected = true;

    this.addMyEmoji(value ? 'assets/unhappy.png' : 'assets/happy.png');

    let feelTxt = value ? "sorry to hear you have negative view of us, we will try to improve" : "Glad to hear you like the new platfrom"

    setTimeout(() => {
      this.sendInitMessage();
    }, 500);

  } */

}
