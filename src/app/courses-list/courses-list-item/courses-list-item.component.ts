import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CoursesListItem } from '../courses-list-item.class';

@Component({
  selector: 'app-courses-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent {
  @Input() public courseItem: CoursesListItem;
  @Output() protected deletedItem = new EventEmitter<CoursesListItem>();

  public constructor() { }

  public deleteItem(course: CoursesListItem): void {
    this.deletedItem.emit(course);
  }

}
