import { Component, OnInit, Output, EventEmitter, Renderer2, OnDestroy, Input, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { trigger, transition, style, animate, query, animateChild } from '@angular/animations';

@Component({
  selector: 'basic-modal',
  exportAs: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('listAnimations', [
      transition(':enter', [
        query('@*', animateChild())
      ])
    ]),
    trigger('modalBackgroud', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300)
      ]),
    ]),
    trigger('modal', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(400)
      ]),
    ])
  ]
  
})
export class ModalComponent implements OnInit, OnDestroy, AfterContentInit {

  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();
  @Input() urlCallback: any;

  private yScrollStack: number[] = [];

  constructor(private renderer: Renderer2, private router: Router, private route: ActivatedRoute, private location: Location) {
    this.yScrollStack.push(window.scrollY);
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
    this.name = `Angular! v1`
  }

  closeModal() {
    //this.router.navigate(['..', this.urlCallback, { outlets: { modal: null } }]);
    this.router.navigate([{ outlets: { modal: '' } }], { relativeTo: this.route, skipLocationChange: true });
  }

  name:string;
  show:boolean = false;

  toggle() {
    this.show = !this.show;
  }

  ngOnInit() {
    window.scrollTo(0, this.yScrollStack.pop());
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'overflow-y');
  }

  ngAfterContentInit(): void {
    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationStart) {
        if (ev.url.includes('modal') || ev.url.includes(this.urlCallback)) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (ev instanceof NavigationEnd) {
        if (ev.url.includes('modal') || ev.url.includes(this.urlCallback)) {
          window.scrollTo(0, this.yScrollStack.pop());
        } else
          window.scrollTo(0, 0);
      }
    });
  }
}
