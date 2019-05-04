import { Subject, Observable } from "rxjs";

export abstract class TableDataSource {

    protected reloadSettingsSubject: Subject<TableSettings>;
    protected setCarregandoSubject: Subject<boolean>;

    constructor() {
        this.reloadSettingsSubject = new Subject<TableSettings>()
        this.setCarregandoSubject = new Subject<boolean>();
    }

    protected emitOnReloadSettings(settings: TableSettings) {
        this.reloadSettingsSubject.next(settings);
    }

    onReloadedSettings(): Observable<any> {
        return this.reloadSettingsSubject.asObservable();
    }

    onCarregando(): Observable<any> {
        return this.setCarregandoSubject.asObservable();
    }

    onReloadSettings(settings: TableSettings) {
        this.emitOnReloadSettings(settings);
    }

    onSetCarregando(active = true) {
        this.setCarregandoSubject.next(active);
    }
}

export class TableSettings extends TableDataSource {

    changedTableServerSide: Subject<TablePaginar> = new Subject<TablePaginar>();

    serverSide: boolean;
    columns: TableColumn[];
    source: any;
    totalItems: number;
    title: string;
    routerRegister: string[];
    mensagemEmpty: string;

    constructor(serverSide: boolean) {
        super();
        this.columns = new Array<TableColumn>();
        this.routerRegister = new Array<string>();
        this.serverSide = serverSide;
        this.mensagemEmpty = "Nenhum registro";
    }
}

/* ```
* Está classe é referente as colunas que vão aparecer na Table UINNTER
*
* PropertyName é o nome da variavel do object, correspondente ao objeto
*
*/
export class TableColumn {

    constructor(propertyName: string, title: string, ordination: boolean, width: number, custom: boolean = false, pipe?: any, pipeArgs?: string) {
        this.propertyName = propertyName;
        this.title = title;
        this.ordination = ordination;
        this.width = width;
        this.pipe = pipe;
        this.pipeArgs = pipeArgs;
        this.custom = custom;
    }

    propertyName: string;
    custom: boolean;
    title: string;
    ordination: boolean;
    width: number;
    actualOrdination: TableOrdination = TableOrdination.ASC;
    pipe: any;
    pipeArgs: string;
}

export enum TableOrdination {
    ASC = 1,
    DESC = 0,
}

export class TablePage {
    actualPage: number;
    itemnPerPage: number;
    columnsOrdenation: Array<TableColumn>;
}

export class ColumnProperties {
    propertyName: string;
    custom: boolean;
    customId: number;
}

export class TablePaginar {
    constructor(page: number, itensPerPage: number, sortColumn: string, sortOrdination: string) {
        this.page = page;
        this.pageSize = itensPerPage;
        this.sortColumn = sortColumn;
        this.sortOrdination = sortOrdination;
    }

    page: number;
    pageSize: number;
    sortColumn: string;
    sortOrdination: string;
}