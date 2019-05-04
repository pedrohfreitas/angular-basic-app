import { OnInit, AfterContentInit, Component, Input, Output, EventEmitter } from "@angular/core";
import { InvokeFunctionExpr } from "@angular/compiler";
import { Subject, Observable } from "rxjs";
import { ViewEncapsulation } from "../../../../../node_modules/@angular/compiler/src/core";

@Component({
    selector: 'basic-table-pagination',
    templateUrl: './table.pagination.component.html',
    styleUrls: ['./table.pagination.component.css']
})
export class TablePaginationComponent implements OnInit {

    @Input() isTop: boolean;
    @Input() totalItems: number;
    @Input() totalItemsPerPage: number;

    @Input() startItemActualPage: number;
    @Input() finalItemActualPage: number;
    @Input() pages : number[];
    @Input() changePageEvent: Observable<number>;

    @Output() beforePage = new EventEmitter<void>();
    @Output() nextPage = new EventEmitter<void>();
    @Output() firstPage = new EventEmitter<void>();
    @Output() lastPage = new EventEmitter<void>();
    @Input() actualPage: number;
    
    targetPage: number

    @Output() changePage = new EventEmitter<number>();

    ngOnInit(): void {
        this.targetPage = this.actualPage;
        this.changePageEvent.subscribe((p) => this.targetPage = p);
    }

    onBeforePage(){
        this.beforePage.emit();
    }

    onNextPage(){
        this.nextPage.emit();
    }

    onFirstPage(){
        this.firstPage.emit();
    }

    onLastPage(){
        this.lastPage.emit();
    }

    onPageTarget(){
        
        if(this.targetPage.toString().replace(" ", "") == ''){
            return;
        }

        this.targetPage = parseInt(this.targetPage.toString());

        if(this.targetPage == 0){
            this.targetPage = 1;
        }

        if(this.targetPage > this.pages.length){
            this.targetPage = this.pages.length;
        }

        this.changePage.emit(this.targetPage);
    }
    
} 