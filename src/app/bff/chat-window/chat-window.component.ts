import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { style, trigger, state, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  animations: [
    trigger('animState', [
      //state('in', style({ transform: 'translateX(0)' })),
      transition('* => up', [
        animate(600, keyframes([
          style({ transform: 'translateY(100%)', offset: 0 }),
          style({ transform: 'translateY(0%)', offset: 1.0 }),

        ]))
      ]),
      transition('up => down', [
        animate(300, keyframes([
          style({ transform: 'scaleY(1)', offset: 0 }),
          style({ transform: 'scaleY(0)', offset: 1.0 }),
        ]))
      ])
    ])
  ]
})
export class ChatWindowComponent implements OnInit {
  animState: string;
  showCloseButn:boolean;
  @Output() onMessage: EventEmitter<string> = new EventEmitter();
  @Output() onclose: EventEmitter<any> = new EventEmitter();
  @ViewChild('main') main: ElementRef;
  @ViewChild('content') content: ElementRef;
  @Input() chatlist: any[];

  constructor() {

  }

  ngOnInit() {
  
  }

  open() {
    this.showCloseButn=true;
    this.main.nativeElement.style.transform = "scaleY(1)";
  }

  scrollToBottom(): void {
   // try {
     setTimeout(() => {
      if (this.content) this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
     }, 50);
      
  
   // } catch (err) { }
  }

  onCloseClick() {
    this.showCloseButn = false;
    this.onclose.emit();
  }

  close() {
    this.showCloseButn = false;
    this.main.nativeElement.style.transform = "scaleY(0)"
  }

  getHeight(): number {
    return this.chatlist.length * 200 + 150;
  }

  onButnClick(event) {
    this.onMessage.emit(event);
  }

}
