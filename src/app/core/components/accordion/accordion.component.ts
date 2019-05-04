import { Component, OnInit, ContentChild } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'basic-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  animations: [
    trigger('toggleAccordion', [
      state('hidden', style({ opacity: 0, "max-height": "0px", "display":"none" })),
      state('visible', style({ opacity: 1, "height": "auto", "display":"block" })),
      transition('hidden => visible', animate('200ms 0s ease-in')),
      transition('visible => hidden', animate('300ms 0s ease-out'))
    ])
  ] 
})
export class AccordionComponent implements OnInit {

  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName;

  accordionState = 'hidden'

  constructor() { }

  ngOnInit() {
  }

  toggleAccordion(){
    this.accordionState = this.accordionState === 'hidden' ? 'visible' : 'hidden';
  }
}
