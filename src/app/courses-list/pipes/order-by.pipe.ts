import { Pipe, PipeTransform } from '@angular/core';
import { CoursesListItem } from '../courses-list-item.class';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courses: CoursesListItem[], order: 'asc'|'desc'): CoursesListItem[] {
    const sortDirection = order === 'asc' ? 1 : -1;
    return courses.sort((a, b) => {
      return (a.creationDate - b.creationDate) * sortDirection;
    });
  }

}
