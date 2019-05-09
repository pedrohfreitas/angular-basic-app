import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'basic-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  image: any;
  width: any;
  height: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.width = window.innerWidth + 'px';
    this.height = window.innerHeight + 'px';


    let url = `url('/assets/_images/background/background-${Math.floor(Math.random() * 3)}.jpg')`;
    this.image = this.sanitizer.bypassSecurityTrustStyle(url);
  }

}
