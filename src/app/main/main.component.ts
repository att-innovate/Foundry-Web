import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = "AT&T"
  text = `AT&T Inc. is a world leader in communications, media,\b
  entertainment and technology. 
  AT&T serves millions of consumers with video, broadband 
  and voice services. Additionally, it provides highly secure 
  solutions for millions of businesses globally.`;

  title2 = "AT&T|Foundry"
  text2 = `The AT&T Foundry brings the expertise of 
  AT&T innovators into a collaborative 
  environment with industry technology 
  providers, developers and sitartups to 
  move ideas to market faster. 
  The AT&T Foundry innovation centers are 
  in 6 cities around the world, and since its 
  inception has executed more than 500 
  projects and deployed dozens of new 
  products and services`;

  title3 = "AT&TFoundry|Israel"
  text3 = `The AT&T Foundry in Israel is designed to drive business 
  impact using innovative technology from within the 
  eco system.
  We validate the technology, find the most suitable use 
  case and take it to the relevant people in AT&T.
  Once a match is done, we accompany the startup through 
  a POC in the business unit and try to take it all the way 
  to commercialization.`;

  bottomtext=`As a leader in communications, AT&T facilitates 
  a huge network and maintains it. 
  All Network areas are valid – Performance, Optimization, 
  Cloud Management, Virtualization … `
  constructor() { }

  ngOnInit() {
  }

}
