import { Pipe, PipeTransform } from '@angular/core';
import { Menu } from '../security/models/menu.model';

@Pipe({
    name: 'menuVisivel',
    pure: false
})
export class MenuVisibelPipe implements PipeTransform {
    transform(items: any): any {
        if (!items) {
            return items;
        }

        return items.filter(item => item.Visivel);
    }
}