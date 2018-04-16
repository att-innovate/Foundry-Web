import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.css'],
  animations: [
    trigger('animationState', [
      transition('* => in', [
        animate('250ms ease-out', keyframes([
          style({ transform: 'translateX(-100%)', offset: 0 }),
          style({ transform: 'translateX(20%)', offset: 0.6 }),
          style({ transform: 'translateX(0%)', offset: 1 })
        ]))
      ]),
      
    ]) ,trigger('animationState2',[
      transition('* => down', [
        animate('700ms ease-out', keyframes([
          style({ transform: 'scaleY(0) translateY(-100%)', offset: 0 }),
          style({ transform: 'scaleY(1.1) translateY(5%)', offset: 0.6 }),
          style({ transform: 'scaleY(1) translateY(0%)', offset: 1 })
        ]))
      ]),
    ])
  ]
})
export class TextBlockComponent implements OnInit {

  @ViewChild('el') el: ElementRef;
  @ViewChild('el2') el2: ElementRef;

  @Input() title: string;
  @Input() text: string;
  @Input() delay: number;

  state: string;
  state2: string;

  title1: string;
  title2: string;
  constructor() { }

  ngOnInit() {
    let arr = this.title.split("|");
    this.title1 = arr[0];
    this.title2 = arr[1] || "";

    this.el.nativeElement.style.transform = "translateX(-100%)";
    this.el.nativeElement.style.visibility = "hidden";

    this.el2.nativeElement.style.transform = "scaleY(0)";

    if (this.delay) {
      setTimeout(() => {
        this.el.nativeElement.style.visibility = "visible";
        this.state = "in";
      }, this.delay);
    }

  }

  animationDone(event) {

    if (event.toState == "down") {
      this.el2.nativeElement.style.transform = "scaleY(1) translateY(0%)";
    }

    if (event.toState == "in") {
      this.el.nativeElement.style.transform = "translateX(0%)";
      this.state2 = "down";
    }

  }


}
