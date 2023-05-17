import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyName'
})
export class OnlyNamePipe implements PipeTransform {

  transform(value: string): string {
    const name=value.split(" ");

    return name[0];
  }

}
