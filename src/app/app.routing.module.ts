import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, RouteReuseStrategy } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/security/guards/auth.guard';
import { CacheRouteReuseStrategy } from './core/router/cache-route-reuse.strategy';
import { NotPermissionComponent } from './core/components/not-permission/not-permission.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'usuario', loadChildren: './pages/usuario/usuario.module#UsuarioModule' },
  { path: 'graficos', loadChildren: './pages/graficos/graficos.module#GraficosModule' },
  { path: 'acesso-negado', component: NotPermissionComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers:[
    {
      provide: RouteReuseStrategy,
      useClass: CacheRouteReuseStrategy
    }
  ]
})
export class AppRoutingModule { }
