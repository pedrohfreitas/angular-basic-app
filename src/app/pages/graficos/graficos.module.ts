import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficoBarraComponent } from './grafico-barra/grafico-barra.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HighlightModule } from 'ngx-highlightjs';
import { GraficoPizzaComponent } from './grafico-pizza/grafico-pizza.component';
import { BasicComponentsModule } from 'src/app/core/components/basic.components.module';
import { GraficoLinhaComponent } from './grafico-linha/grafico-linha.component';
import { GraficoDiversosComponent } from './grafico-diversos/grafico-diversos.component';

const ROUTES: Routes = [
    { path: 'graficobarra', component: GraficoBarraComponent },
    { path: 'graficopizza', component: GraficoPizzaComponent },
    { path: 'graficolinha', component: GraficoLinhaComponent },
    { path: 'graficodiversos', component: GraficoDiversosComponent }
];

@NgModule({
  declarations: [GraficoBarraComponent, GraficoPizzaComponent, GraficoLinhaComponent, GraficoDiversosComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    RouterModule.forChild(ROUTES),
    HighlightModule,
    BasicComponentsModule
  ]
})
export class GraficosModule { }
