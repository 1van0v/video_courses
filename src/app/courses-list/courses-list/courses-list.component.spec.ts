import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListComponent } from './courses-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CoursesService } from '../courses.service';
import { CoursesListItem } from '../courses-list-item.class';
import { CoursesListItemComponent } from '../courses-list-item/courses-list-item.component';
import { By } from '@angular/platform-browser';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let getCoursesSpy: any;
  const testItem: CoursesListItem = {
    id: 1,
    title: 'test title',
    creationDate: 1572870106633,
    duration: 100,
    description: 'test description'
  };

  beforeEach(async(() => {

    const coursesService = jasmine.createSpyObj('CoursesService', ['getCourses']);

    getCoursesSpy = coursesService.getCourses.and.returnValue( of({
      courses: [ testItem ]
    }) );

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CoursesListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ { provide: CoursesService, useValue: coursesService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCourses method of CoursesService', () => {
    expect(getCoursesSpy).toHaveBeenCalled();
  });

  it('should store courses list in courses property of component class', () => {
    expect(component.courses.length).toEqual(1);
    expect(component.courses[0]).toEqual(testItem);
  });

  it('should call onDeleteItem method on click on delete button', () => {
    const coursesListItemElement = fixture.debugElement.query(By.css('app-courses-list-item'));
    const onDeleteItemSpy = spyOn(component, 'onDeleteItem').and.callThrough();

    coursesListItemElement.triggerEventHandler('deletedItem', testItem);
    fixture.detectChanges();
    expect(onDeleteItemSpy).toHaveBeenCalledWith(testItem);
  });

  it('should call onLoadMore method on clicking on load more button', () => {
    const loadMoreBtn = fixture.nativeElement.querySelector('.load-more-btn');
    const onLoadMoreSpy = spyOn(component, 'onLoadMore').and.callThrough();

    loadMoreBtn.click();

    expect(onLoadMoreSpy).toHaveBeenCalled();
  });

  it('should pass store the inputted search string in searchString property', () => {
    const testStr = 'test course';
    const searchElement = fixture.nativeElement.querySelector('.search-field');

    searchElement.value = testStr;
    searchElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchString).toEqual(testStr);
  });

  it('should call onSearch method on clicking on search button', () => {
    const searchBtn = fixture.nativeElement.querySelector('.search-btn');
    const onSearchSpy = spyOn(component, 'onSearch').and.callThrough();

    searchBtn.click();

    expect(onSearchSpy).toHaveBeenCalled();
  });
});
