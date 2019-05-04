import { AccordionComponent } from "./accordion/accordion.component";
import { ModalComponent } from "./modal/modal.component";
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { PipesModule } from "../pipes/pipe.module";
import { ModalDataService } from "./modal/moda.service";
import { NgModule } from "@angular/core";
import { TableComponent } from "./table/table.component";
import { TablePaginationComponent } from "./table/table.pagination.component";
import { DynamicPipeTable } from "./table/table.dynamic.pipe";
import { DatePipe, CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { InputWithErrorsComponent } from './input-with-errors/input-with-errors.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
    declarations: [
        AccordionComponent,
        ModalComponent,
        AutocompleteComponent,
        TableComponent,
        TablePaginationComponent,
        DynamicPipeTable,
        InputWithErrorsComponent,
        BreadcrumbComponent,
    ],
    exports:[
        AccordionComponent,
        ModalComponent,
        AutocompleteComponent,
        TableComponent,
        InputWithErrorsComponent,
        BreadcrumbComponent
    ],
    imports: [ 
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        PipesModule, 
        RouterModule,
        PipesModule,
    ],
    providers: [
        ModalDataService,
        DatePipe
    ]
})
export class BasicComponentsModule {

}