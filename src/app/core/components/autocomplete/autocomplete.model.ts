import { Subject, Observable } from "rxjs";

export abstract class AutomcompleteDataSource {

    protected changedSourceSubject: Subject<AutocompleteModel[]>;

    constructor() {
        this.changedSourceSubject = new Subject<AutocompleteModel[]>()
    }

    protected emitOnChangedSourceAutocomplete(source: AutocompleteModel[]) {
        this.changedSourceSubject.next(source);
    }

    onChangedSourceAutocomplete(): Observable<any> {
        return this.changedSourceSubject.asObservable();
    }

    onChangeSourceAutocomplete(source: AutocompleteModel[]) {
        this.emitOnChangedSourceAutocomplete(source);
    }

    onSearchResults;

}

export class AutocompleteSettings extends AutomcompleteDataSource {

    constructor(title: string, 
        required: boolean, 
        serverData: boolean = false, 
        showInternalMessageErro: boolean = true, 
        messageRequired: string = null, 
        source: AutocompleteModel[] = null) {
        super();
        this.source = source;
        this.serverData = serverData;
        this.title = title;
        this.required = required;
        this.messageRequired = messageRequired != undefined ? messageRequired : "Campo inválido";
        this.showInternalMessageErro = showInternalMessageErro;
    }

    title: string;
    serverData: boolean;
    required: boolean;
    showInternalMessageErro: boolean;
    source: AutocompleteModel[];
    placeholder: string;
    emptyMessage: string;
    messageRequired: string;
    queryServerData: Observable<any>;
}

export class AutocompleteModel {

    constructor(key: string, value: string, naoEncontrado: boolean = false, item: any = null) {
        this.key = key;
        this.value = value;
        this.naoEncontrado = naoEncontrado;
        this.item = item;
    }

    key: string;
    value: string;
    naoEncontrado: boolean = false;
    valueHTML: string;
    item: any;
}