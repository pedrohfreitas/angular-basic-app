import { Component, OnInit, Input, AfterContentInit, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { TableSettings, TableColumn, TableOrdination, TablePage, ColumnProperties, TablePaginar } from './table.model';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { Helper } from '../../helpers/helper';

@Component({
  selector: 'basic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterContentInit {

  @Input() settings: TableSettings;

  @Output() changedItemsPerPage = new EventEmitter<number>();
  @Output() changedOrdernationColumn = new EventEmitter<TableColumn>();
  @Output() changedPage = new EventEmitter<TablePage>();

  @ContentChild('customTemplate1') customTemplate1: TemplateRef<any>;
  @ContentChild('customTemplate2') customTemplate2: TemplateRef<any>;

  totalPages: number;
  pages: number[];
  startItemActualPage: number;
  finalItemActualPage: number;
  propertiesColumn: Array<ColumnProperties> = new Array<ColumnProperties>();
  selectedItemsPerPage: number;
  actualPage: number;
  carregando: boolean = false;
  sortColumn: string;
  sortOrdination: TableOrdination;

  changePageEventSubject: Subject<number> = new Subject<number>();

  constructor() { }

  ngOnInit() {

    //Instancia e seta os valores dfault
    this.onInitDefaultTable();

    //Listener para a atualização das configurações
    this.settings.onReloadedSettings().subscribe((settings: TableSettings) => {
      this.settings = settings;
      this.onResetTable();
    })

    //Listener para o apresentação da mensagem de carregando
    this.settings.onCarregando().subscribe((carregando: boolean) => {
      this.carregando = carregando
    });

    //Listener para os Eventos de Paginação
    this.changedItemsPerPage.subscribe(() => this.paginarServerSide());
    this.changedOrdernationColumn.subscribe(() => this.paginarServerSide());
    this.changedPage.subscribe(() => this.paginarServerSide());
    this.changePageEventSubject.subscribe(() => this.paginarServerSide());

  }

  ngAfterContentInit(): void {

    //Validação das configurações
    if (this.settings == undefined) {
      throw new Error("Não foi possível encontrar as configurações");
    }

    //Validação do total de itens
    if (this.settings.totalItems <= 0) {
      throw new Error("O total de itens na grid é obrigatório");
    }

    //Cria uma array os as propriedades da lista
    let customId = 1;
    this.propertiesColumn = this.settings.columns.map((column: TableColumn) => {
      let col = new ColumnProperties();
      col.custom = column.custom;
      col.propertyName = column.propertyName;

      if (col.custom) {
        col.customId = customId;
        customId++;
      }

      return col;
    }).filter(m => m != undefined);

    //Setá as ordenações default
    this.sortColumn = this.propertiesColumn[0].propertyName;
    this.sortOrdination = TableOrdination.ASC;

    //Monta a estrutura da tabela
    this.calculatePages();
  }

  onInitDefaultTable() {
    this.selectedItemsPerPage = 10;
    this.actualPage = 1;
    this.propertiesColumn = new Array<ColumnProperties>();
    this.startItemActualPage = 1;
  }

  onResetTable() {
    this.actualPage = 1;
    this.startItemActualPage = 1;
    this.calculatePages();
  }

  ordernationColumn(column: TableColumn) {
    if (column.ordination) {
      if (column.actualOrdination == TableOrdination.ASC) {
        column.actualOrdination = TableOrdination.DESC
      } else {
        column.actualOrdination = TableOrdination.ASC
      }
    }

    this.sortOrdination = column.actualOrdination;
    this.sortColumn = column.propertyName;

    if (this.settings.serverSide) {
      this.changedOrdernationColumn.emit(column);
    } else {
      if (!this.settings.source)
        return;
      var source = <Array<any>>this.settings.source;
      this.settings.source = source.sort(Helper.dynamicSort(column.propertyName, column.actualOrdination))
    }
  }


  getPipe(propertyName: string) {
    var properyColumn = this.settings.columns.filter(c => c.propertyName == propertyName)[0];
    if (properyColumn != undefined && properyColumn.pipe != undefined) {
      return properyColumn.pipe;
    }
  }

  getPipeArgs(propertyName: string) {
    var properyColumn = this.settings.columns.filter(c => c.propertyName == propertyName)[0];
    if (properyColumn != undefined && properyColumn.pipe != undefined) {
      return properyColumn.pipeArgs;
    }
  }

  getWidthClassColumn(th: TableColumn) {
    if (th.width > 0) {
      if (th.width > 150) {
        throw new Error("O limite para o Width é de 150!");
      }
      return `text-center w-column-${th.width}`
    }
  }

  onBeforePage() {
    this.actualPage--;
    if (this.settings.serverSide) {
      let page = this.createObjectPage();
      this.changedPage.emit(page);
    } else {
      this.calculatePages();
    }
  }

  onNextPage() {
    this.actualPage++;
    if (this.settings.serverSide) {
      let page = this.createObjectPage();
      this.changedPage.emit(page);
    } else {
      this.calculatePages();
    }
  }

  onFirstPage() {
    this.actualPage = 1;
    if (this.settings.serverSide) {
      let page = this.createObjectPage();
      this.changedPage.emit(page);
    } else {
      this.calculatePages();
    }
  }

  onLastPage() {
    this.actualPage = this.pages.length;
    if (this.settings.serverSide) {
      let page = this.createObjectPage();
      this.changedPage.emit(page);
    } else {
      this.calculatePages();
    }
  }

  onEspecificPage(page: number) {
    this.actualPage = page;
    if (this.settings.serverSide) {
      let page = this.createObjectPage();
      this.changedPage.emit(page);
    } else {
      this.calculatePages();
      this.changePageEventSubject.next(page);
    }
  }

  onSetItemsPerPage(item: number) {
    this.calculatePages();
  }

  calculatePages() {

    let finalValue = this.actualPage * this.selectedItemsPerPage;
    if (finalValue > this.settings.totalItems) {
      this.finalItemActualPage = this.settings.totalItems;
    } else {
      this.finalItemActualPage = finalValue;
    }

    let startValue = (this.actualPage * this.selectedItemsPerPage) - this.selectedItemsPerPage;
    if (startValue <= 0) {
      this.startItemActualPage = 1;
    } else {
      this.startItemActualPage = startValue + 1;
    }

    this.totalPages = Math.ceil(this.settings.totalItems / this.selectedItemsPerPage);

    if (this.totalPages == 0) {
      this.totalPages = 1;
    }

    this.pages = new Array<number>();

    for (let index = 1; index <= this.totalPages; index++) {
      this.pages.push(index)
    }

    if (this.totalPages == 1) {
      this.startItemActualPage = 1;
      this.finalItemActualPage = this.settings.totalItems;
    }

    if (this.actualPage > this.totalPages) {
      this.actualPage = this.totalPages
    }
  }

  hasColumn(nameColumn: string): boolean {
    return this.settings.columns.filter(c => c.propertyName == nameColumn).length > 0;
  }

  createObjectPage(): TablePage {
    let page = new TablePage();
    page.columnsOrdenation = this.settings.columns.filter(x => x.ordination == true);
    page.actualPage = this.actualPage;
    page.itemnPerPage = this.selectedItemsPerPage;
    return page;
  }

  paginarServerSide() {
    this.settings.changedTableServerSide.next(new TablePaginar(this.actualPage, this.selectedItemsPerPage, this.sortColumn, TableOrdination[this.sortOrdination]));
  }

  getValue(obj, property) {
    var existPonto = property.indexOf(".");

    if(existPonto > 0) {
      var arr = property.split(".");      
      while(arr.length && (obj = obj[arr.shift()]));     
  
      return obj;
    }else {
      return obj[property];
    }        
  }
}
