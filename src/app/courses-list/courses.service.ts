import { Injectable } from '@angular/core';
import { CoursesListItem } from './courses-list-item.class';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  public getCourses(): CoursesListItem[] {
    return [
      {
        id: 1,
        title: 'Video course 1',
        creationDate: (new Date()).valueOf(),
        duration: 100,
        description: 'This is video course 1'
      },
      {
        id: 2,
        title: 'Video course 2',
        creationDate: (new Date()).valueOf() - 1000000,
        duration: 100,
        description: 'This is video course 2'
      },
      {
        id: 3,
        title: 'Video course 3',
        creationDate: (new Date()).valueOf() - 3000000,
        duration: 100,
        description: 'This is video course 3'
      },
      {
        id: 4,
        title: 'Video course 4',
        creationDate: (new Date()).valueOf() - 4000000,
        duration: 100,
        description: 'This is video course 4'
      }
    ];
  }
}
