import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(name: number | undefined): string {
    if (name === undefined) {
        return '';
    }

    const splitName = ('0'+name.toString()).slice(-2);
    return splitName;
}

}
