import { Component, OnInit } from '@angular/core';
import { BreadcrumbModel } from 'src/app/core/components/breadcrumb/breadcrumb.model';

@Component({
  selector: 'basic-grafico-diversos',
  templateUrl: './grafico-diversos.component.html',
  styleUrls: ['./grafico-diversos.component.css']
})
export class GraficoDiversosComponent implements OnInit {

  breadcrumbModel: Array<BreadcrumbModel> = new Array<BreadcrumbModel>();

  //tamanho do gráfico (width/height)
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'País';
  showYAxisLabel = true;
  yAxisLabel = 'População';

  dadosSingle: any;
  dadosMulti: any;

  colorScheme = {
    domain: ['#29487A', '#FFC913', '#2390CC', '#AAAAAA']
  };

  constructor() {
    this.dadosSingle = [
      {
        "name": "Alemanha",
        "value": 8940000
      },
      {
        "name": "Estados Unindos",
        "value": 5000000
      },
      {
        "name": "França",
        "value": 7200000
      }
    ];
    
    this.dadosMulti = [
      {
        "name": "Alemanha",
        "series": [
          {
            "name": "2010",
            "value": 7300000
          },
          {
            "name": "2011",
            "value": 8940000
          }
        ]
      },
    
      {
        "name": "Estados Unindos",
        "series": [
          {
            "name": "2010",
            "value": 7870000
          },
          {
            "name": "2011",
            "value": 8270000
          }
        ]
      },
    
      {
        "name": "França",
        "series": [
          {
            "name": "2010",
            "value": 5000002
          },
          {
            "name": "2011",
            "value": 5800000
          }
        ]
      }
    ]
    let dadosSingle = this.dadosSingle;
    let dadosMulti = this.dadosMulti;
    Object.assign(this, {dadosSingle, dadosMulti}) 
   }

  ngOnInit() {
    this.breadcrumbModel.push(new BreadcrumbModel([''],'Gráficos diversos',false));
  }

  onSelect(item){

  }

}
