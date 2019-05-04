import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { AuthService } from '../security/services/auth.service';

@Directive({
    selector: '[permissao]'
})
export class AuthDirective implements OnInit {

    @Input('menu') menuCodigo: any;
    @Input('privilegio') privilegioCodigo: any;

    constructor(public _elementRef: ElementRef, private auth: AuthService) {}

    ngOnInit() {
        if (!this.auth.verifyPrivilegio(this.menuCodigo, this.privilegioCodigo)) {
            this._elementRef.nativeElement.remove();
        }
    }
}
