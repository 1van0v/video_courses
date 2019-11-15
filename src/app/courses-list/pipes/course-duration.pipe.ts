import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseDuration'
})
export class CourseDurationPipe implements PipeTransform {

  public transform(value: number): string {
    let duration = '';
    duration += String( Math.trunc(value / 60) ) + 'h ';
    duration += String( value % 60 ) + 'm';
    return duration;
  }

}
