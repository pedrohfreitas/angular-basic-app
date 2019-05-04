import { EventEmitter } from '@angular/core';
export class LoadingService {
    
    notifier = new EventEmitter();

    show(): void {
        this.notifier.emit(true);
    }
    hide(): void {
        this.notifier.emit(false);
    }
}