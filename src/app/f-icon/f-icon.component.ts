import { Component, OnInit, Input, ViewChild, Directive, ElementRef, Renderer2} from '@angular/core';
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
/*
@HostListener('mouseenter') 
  onMouseEnter() {
    alert("lalala");
    //this.el.nativeElement.highlight('yellow');
  }
*/

export class FIconComponent implements OnInit {
  @ViewChild('el') el: ElementRef;
  @ViewChild('dat') dat: ElementRef;
  @ViewChild('lineTop') lineTop: ElementRef;
  @ViewChild('lineLeft') lineLeft: ElementRef;
  @ViewChild('lineBottom') lineBottom: ElementRef;
  @ViewChild('line') line: ElementRef;

  @Input() text: string;
  @Input() desc: string;
  @Input() image: string;
  @Input() location: number[];
  /*@Input() class:any;*/

  state: string;
  url:string;
  constructor() { }

  ngOnInit() {
    this.url = `assets/images/${this.image}.png`
    //this.el.nativeElement.style.visibility = "hidden";

    /*let delay: number = this.index * 200;
    setTimeout(() => {
      this.el.nativeElement.style.visibility = "visible";
      this.state = "in";
    }, delay);*/
  }

  hideData() {

    var type = `${this.text}`;
    console.log(type);
    this.dat.nativeElement.style.visibility = "hidden";
    this.lineTop.nativeElement.style.visibility = "hidden";
    this.lineLeft.nativeElement.style.visibility = "hidden";
    this.lineBottom.nativeElement.style.visibility = "hidden";
    this.line.nativeElement.style.visibility = "hidden";
  }

  showData(/*renderer: Renderer2*/) {

    //var type = `${this.text}`;
    //var loc = this.location;
    //console.log(type);
    this.dat.nativeElement.style.visibility = "visible";
    //this.lineTop.nativeElement.style.visibility = "visible";
    this.lineLeft.nativeElement.style.visibility = "visible";

    //console.log(loc[1]);
    let row: number;
    row = this.location[0];

    let col: number;
    col = this.location[1];

    switch(row) {
      case 1: {
        this.dat.nativeElement.style.marginTop = "180px";

        this.lineLeft.nativeElement.style.height = "280px";
        break;
      }
      case 2: {
        this.dat.nativeElement.style.marginTop = "100px";

        this.lineLeft.nativeElement.style.height = "110px";
        break;
      }

      case 3: {
        this.dat.nativeElement.style.marginTop = "20px";

        this.lineLeft.nativeElement.style.height = "120px";
        break;
      }
    }

    switch(col) {
      case 1: {
        this.lineTop.nativeElement.style.visibility = "visible";
        this.lineTop.nativeElement.style.marginLeft = "-120px";
        this.lineTop.nativeElement.style.marginTop = "-90px";
        this.lineTop.nativeElement.style.width = "120px";

        this.lineLeft.nativeElement.style.marginLeft = "-120px";

        this.lineBottom.nativeElement.style.visibility = "visible";
        this.lineBottom.nativeElement.style.marginLeft = "-120px";
        this.lineBottom.nativeElement.style.width = "25px";
        break;
      }

      case 2: 
      case 4: {
        this.lineLeft.nativeElement.style.marginLeft = "60px";
        this.lineLeft.nativeElement.style.marginTop = "-15px";
        break;
      }

      case 3: {
        if (row == 1) {
          this.line.nativeElement.style.visibility = "visible";
          this.line.nativeElement.style.height = "20px";
          this.line.nativeElement.style.marginTop = "-370px";
          this.line.nativeElement.style.marginLeft = "60px";

          this.lineTop.nativeElement.style.visibility = "visible";
          this.lineTop.nativeElement.style.marginLeft = "60px";
          this.lineTop.nativeElement.style.marginTop = "-180px";
          this.lineTop.nativeElement.style.width = "360px";

          this.lineLeft.nativeElement.style.marginLeft = "418px";
          this.lineLeft.nativeElement.style.height = "370px";

          this.lineBottom.nativeElement.style.visibility = "visible";
          this.lineBottom.nativeElement.style.marginLeft = "240px";
          this.lineBottom.nativeElement.style.width = "180px";


        } else if (row == 3) {
          this.lineLeft.nativeElement.style.height = "30px";
          this.lineLeft.nativeElement.style.marginLeft = "60px";
          this.lineLeft.nativeElement.style.marginTop = "-15px";
        }

        break;
      }
 
      case 5: {
        this.lineTop.nativeElement.style.visibility = "visible";
        this.lineTop.nativeElement.style.marginLeft = "130px";
        this.lineTop.nativeElement.style.marginTop = "-90px";
        this.lineTop.nativeElement.style.width = "130px";

        this.lineLeft.nativeElement.style.marginLeft = "260px";

        this.lineBottom.nativeElement.style.visibility = "visible";
        this.lineBottom.nativeElement.style.marginLeft = "235px";
        this.lineBottom.nativeElement.style.width = "25px";
        break;
      }
    }


    //this.dat.nativeElement.style.marginTop = "500px";
    //this.dat.nativeElement.style.backgroundColor = "yellow";
    //renderer.setStyle(this.dat.nativeElement, 'backgroundColor', 'yellow');
    /*
    switch(type) { 
      case "Network": { 
          //alert("Network");
          //var desc = "As a leader in communications, AT&T facilitates a huge network and maintains it. All network areas ar valid: Performance, Optimization, Cloud Management, Virtualization ...";
          this.dat.nativeElement.style.visibility = "visible";
          //this.re   .selectRootElement(this.input["nativeElement"])
         break; 
      } 
      case "5G": { 
        //alert("5G");
        
         break; 
      } 
      default: { 
         //statements; 
         break; 
      } 
   } */
  }

  
  //mouseHover(e) {
    //console.log('hovered', e);
  //  alert("lalala");
  //}

  

}
