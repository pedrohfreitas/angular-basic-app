import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HighlightResult } from 'ngx-highlightjs';
import { BreadcrumbModel } from 'src/app/core/components/breadcrumb/breadcrumb.model';

@Component({
  selector: 'basic-grafico-barra',
  templateUrl: './grafico-barra.component.html',
  styleUrls: ['./grafico-barra.component.css']
})
export class GraficoBarraComponent implements OnInit {

  breadcrumbModel: Array<BreadcrumbModel> = new Array<BreadcrumbModel>();

  //tamanho do gráfico (width/height)
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  animations = true;
  showXAxisLabel = true;
  xAxisLabel = 'País';
  showYAxisLabel = true;
  yAxisLabel = 'População';
  schemeType = 'ordinal';
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
        "name": "Estados Unidos",
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
        "name": "Estados Unidos",
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
    ];

    let dadosSingle = this.dadosSingle;
    let dadosMulti = this.dadosMulti;
    Object.assign(this, { dadosSingle, dadosMulti })
  }

  ngOnInit() {
    this.breadcrumbModel.push(new BreadcrumbModel([''],'Gráfico de barras',false));
  }

  response: HighlightResult;
  codeTs = `
  //tamanho do gráfico (width/height)
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  animations = false;
  showXAxisLabel = true;
  xAxisLabel = 'País';
  showYAxisLabel = true;
  yAxisLabel = 'População';
  schemeType = 'ordinal';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() { 
    Object.assign(this, { dadosSingle, dadosMulti });
  }
  `;
  codeHtml = `
  <ngx-charts-bar-horizontal-normalized
                    [view]="view"
                    [scheme]="colorScheme"
                    [results]="dadosMulti"
                    [gradient]="gradient"
                    [xAxis]="showXAxis"
                    [yAxis]="showYAxis"
                    [legend]="showLegend"
                    [animations]="animations"
                    [schemeType]="schemeType"
                    [showXAxisLabel]="showXAxisLabel"
                    [showYAxisLabel]="showYAxisLabel"
                    [xAxisLabel]="xAxisLabel"
                    [yAxisLabel]="yAxisLabel">
                    </ngx-charts-bar-horizontal-normalized>`;
  codeDados = `
  var dadosSingle = [
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

  var dadosMulti = [
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
      "name": "Estados Unidos",
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
  ];`;

  onHighlight(e) {
    this.response = {
      language: e.language,
      r: e.r,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }

}
