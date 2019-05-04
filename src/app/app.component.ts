import { Component } from '@angular/core';
import { NavigationCancel, RouterEvent, NavigationStart, NavigationError, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from './core/components/loading/loading.service';

@Component({
  selector: 'basic-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  constructor(private _router: Router, private _spinnerService: NgxSpinnerService, private _loadingService: LoadingService) { }

  ngOnInit() {
    this._router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      //this._spinnerService.show();
      this._loadingService.show();
    }
    if (event instanceof NavigationEnd) {
      //this._spinnerService.hide();
      this._loadingService.hide();
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      //this._spinnerService.hide();
      this._loadingService.hide();
    }
    if (event instanceof NavigationError) {
      //this._spinnerService.hide();
      this._loadingService.hide();
    }
  }
}
