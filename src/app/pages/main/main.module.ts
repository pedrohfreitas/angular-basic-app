import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/security/guards/auth.guard';

const routes: Routes = [
  {
      path: '',
      component: MainComponent,
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      children: [
          { path: '', redirectTo: 'home', pathMatch: 'prefix' },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
      ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
