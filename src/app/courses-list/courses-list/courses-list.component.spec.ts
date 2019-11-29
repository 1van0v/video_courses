import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { CoursesListComponent } from './courses-list.component';
import { CoursesService } from '../courses.service';
import { CoursesListItem } from '../courses-list-item.class';
import { SearchCoursesPipe } from '../pipes/search-courses.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let getCoursesSpy: any;
  const testItem: CoursesListItem = {
    id: 1,
    title: 'test title',
    creationDate: 1572870106633,
    duration: 100,
    description: 'test description',
    topRated: false,
    authors: ''
  };

  const courses = [ testItem ];

  beforeEach(async(() => {
    const coursesService = jasmine.createSpyObj('CoursesService', ['getCourses']);
    getCoursesSpy = coursesService.getCourses.and.returnValue( of(courses) );

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CoursesListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: CoursesService, useValue: coursesService },
        SearchCoursesPipe,
        OrderByPipe
      ]
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
    const loadMoreBtn = fixture.nativeElement.querySelector('.full-width-btn');
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
    const searchBtn = fixture.nativeElement.querySelector('.search-container .action-btn');
    const onSearchSpy = spyOn(component, 'onSearch').and.callThrough();

    searchBtn.click();

    expect(onSearchSpy).toHaveBeenCalled();
  });

  describe('empty coursesList', () => {
    beforeEach(() => {
      courses.length = 0;
      fixture.detectChanges();
    });

    it('should display no data button', () => {
      const btnLabel = 'No data. Feel free to add a new course.';
      const element = fixture.debugElement.query(By.css('.full-width-btn'));
      const displayedTxt = element.nativeElement.textContent;
      expect(displayedTxt.trim()).toEqual(btnLabel);
    });

    afterEach(() => {
      courses.push(testItem);
    });
  });

});
