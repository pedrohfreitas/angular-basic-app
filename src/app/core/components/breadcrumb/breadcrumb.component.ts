import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Location } from '@angular/common'
import { BreadcrumbModel } from './breadcrumb.model';

@Component({
  selector: 'basic-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, AfterContentInit {

  @Input() BreadcrumbModel: Array<BreadcrumbModel>;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    if (this.BreadcrumbModel == undefined) {
      throw new Error("É preciso informar um breadcrumbModel para utilizar o componenet de Breadcrumb.");
    }
  }

  onVoltar(){
    this.location.back();
  }
}
