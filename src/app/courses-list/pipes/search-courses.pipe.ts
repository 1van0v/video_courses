import { Pipe, PipeTransform } from '@angular/core';
import { CoursesListItem } from '../courses-list-item.class';

@Pipe({
  name: 'searchPipe'
})
export class SearchCoursesPipe implements PipeTransform {

  public transform(value: CoursesListItem[], searchStr: string): CoursesListItem[] {
    const filtered = value.filter((item) => {
      if (!searchStr) { return true; }
      return item.title.toLowerCase().includes( searchStr.trim().toLowerCase() );
    });
    return filtered;
  }

}
