import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { routerAnimation } from 'src/app/core/animations/router.animations';

@Component({
  selector: 'basic-usuario',
  template: `
    <main #routerMain [@routeSlide]="getState(o)">
      <router-outlet #o="outlet"></router-outlet>
    </main>    
    `,
  animations: [routerAnimation]
})
export class UsuarioComponent implements OnInit {

  @ViewChild('routerMain')
  routerMain: ElementRef;

  ngOnInit(): void {
  }

  getState(outlet) {

    let width = this.routerMain.nativeElement.offsetWidth;

    return {
      "value": outlet.activatedRouteData.state,
      "params": {
        "widthPage": width
      }
    }
  }
}
