import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import locatePt  from '@angular/common/locales/pt';
registerLocaleData(locatePt, 'pt')

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { registerLocaleData, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PipesModule } from './core/pipes/pipe.module';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SharedModule } from './pages/shared.module';
import { MenuComponent } from './core/components/menu/menu.componenent';
import { NgxSpinnerModule } from 'ngx-spinner';

import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import { NotPermissionComponent } from './core/components/not-permission/not-permission.component';
import { MainComponent } from './pages/main/main.component';

/** 
 * Import every language you wish to highlight here
 * NOTE: The name of each language must match the file name its imported from
 */
export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'javascript', func: javascript},
    {name: 'scss', func: scss},
    {name: 'xml', func: xml}
  ];
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    MainComponent,
    MenuComponent,
    NotPermissionComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PipesModule,
    NgxSpinnerModule,
    HighlightModule.forRoot({ languages: hljsLanguages }),
    SharedModule.forRoot(),
  ], 
  providers: [
    HttpClient,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
