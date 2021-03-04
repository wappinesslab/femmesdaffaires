import { Pipe, PipeTransform } from '@angular/core';
import { NgModel } from '@angular/forms';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
    transform(businessesList: any[], term: string): any {
        // I am unsure what id is here. did you mean title?
        return businessesList.filter(businesses => businesses.companyName.indexOf(term) !== -1);
    }
}
