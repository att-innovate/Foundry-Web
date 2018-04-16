import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'f-icon',
  templateUrl: './f-icon.component.html',
  styleUrls: ['./f-icon.component.css'],
  animations: [
    trigger('animationState', [
      transition('* => in', [
        animate('400ms ease-out', keyframes([
          style({ transform: 'scale(0)', opacity:0,  offset: 0 }),
          style({ transform: 'scale(1.3)', opacity:1, offset: 0.7 }),
          style({ transform: 'scale(1)', opacity:1, offset: 1 })
        ]))
      ]),

    ])
  ]
})
export class FIconComponent implements OnInit {
  @ViewChild('el') el: ElementRef;
  @Input() text: string;
  @Input() index: number;
  state: string;
  url:string;
  constructor() { }

  ngOnInit() {
    this.url = `assets/icon${this.index}.png`
    this.el.nativeElement.style.visibility = "hidden";

    let delay: number = this.index * 200;
    setTimeout(() => {
      this.el.nativeElement.style.visibility = "visible";
      this.state = "in";
    }, delay);

  }

}
