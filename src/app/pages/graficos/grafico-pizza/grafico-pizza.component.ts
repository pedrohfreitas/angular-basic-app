import { Component, OnInit } from '@angular/core';
import { BreadcrumbModel } from 'src/app/core/components/breadcrumb/breadcrumb.model';

@Component({
  selector: 'basic-grafico-pizza',
  templateUrl: './grafico-pizza.component.html',
  styleUrls: ['./grafico-pizza.component.css']
})
export class GraficoPizzaComponent implements OnInit {

  breadcrumbModel: Array<BreadcrumbModel> = new Array<BreadcrumbModel>();

  //tamanho do gráfico (width/height)
  view: any[] = [700, 400];

  // options
  showLegend = true;

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  dadosSingle: any;

  colorScheme = {
    domain: ['#29487A', '#FFC913', '#2390CC', '#AAAAAA']
  };

  gradient: any;

  constructor() {
    this.dadosSingle = [
      {
        "name": "Alemanha",
        "value": 8940000
      },
      {
        "name": "Estados Unidos",
        "value": 5000000
      },
      {
        "name": "França",
        "value": 7200000
      }
    ];

    let dadosSingle = this.dadosSingle;
    Object.assign(this, { dadosSingle });
   }

  ngOnInit() {
    this.breadcrumbModel.push(new BreadcrumbModel([''],'Gráfico de pizza',false));
  }

  onSelect(item){

  }

}
