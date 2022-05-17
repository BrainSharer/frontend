import { Pipe, PipeTransform } from '@angular/core';
import { StateView } from '../_models/state_view';

@Pipe({
    name: 'stateFilter',
    pure: false
})
export class StateFilterPipe implements PipeTransform {
    transform(items: StateView[], filter: StateView): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.group_name.indexOf(filter.group_name) !== -1);
    }
}