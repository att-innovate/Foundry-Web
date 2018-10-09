import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { style, trigger, state, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'bff-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  animations: [
    trigger('animState', [
      transition('* => user-in', [
        animate(200, keyframes([
          style({ transform: 'translateX(-100%) scaleX(0)', offset: 0 }),
          style({ transform: 'translateX(0%) scaleX(1)', offset: 1.0 }),
        ]))
      ]),
      transition('* => bot-in', [
        animate(200, keyframes([
          style({ transform: 'translateX(100%) scaleX(0)', offset: 0 }),
          style({ transform: 'translateX(0%) scaleX(1)', offset: 1.0 }),
        ]))
      ])
    ])
  ]
})
export class MessageComponent implements OnInit {
  @ViewChild('myRange') myRange: ElementRef;
  @Input() data: any;
  @Output() onButnClick: EventEmitter<string> = new EventEmitter();

  animState:string;
  curDate: Date;
  rate = 5;

  constructor() {

  }

  ngOnInit() {
    //console.log("new message");
    this.curDate = new Date();
    this.animState = this.data.type == "bot"?"bot-in":"user-in";
    
  }

  butnClick(event) {
    this.data.uitype = "";
    this.onButnClick.emit(event);
  }

  onChange(event) {
    this.data.uitype = "";
    this.onButnClick.emit(this.myRange.nativeElement.value);
  }
}
