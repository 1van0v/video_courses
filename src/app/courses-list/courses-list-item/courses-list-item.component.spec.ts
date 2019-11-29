import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Pipe, PipeTransform, NO_ERRORS_SCHEMA } from '@angular/core';

import { CoursesListItemComponent } from './courses-list-item.component';
import { CoursesListItem } from '../courses-list-item.class';
import { RouterTestingModule } from '@angular/router/testing';

describe('CoursesListItemComponent', () => {
  let component: CoursesListItemComponent;
  let fixture: ComponentFixture<CoursesListItemComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const testData: CoursesListItem = {
    id: 1,
    title: 'test title',
    creationDate: 1572870106633,
    duration: 100,
    description: 'test description',
    topRated: false,
    authors: ''
  };

  beforeEach(async(() => {
    @Pipe({ name: 'courseDuration'})
    class MockPipe implements PipeTransform {
      transform(value: number): string {
        return value.toString();
      }
    }

    TestBed.configureTestingModule({
      declarations: [
        CoursesListItemComponent,
        MockPipe
      ],
      imports: [ RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListItemComponent);
    component = fixture.componentInstance;
    component.courseItem = testData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call console.log with id = ${testData.id}`, () => {
    const deleteItemSpy = spyOn(component, 'deleteItem').and.callThrough();
    const deleteBtn = fixture.debugElement.nativeElement.querySelectorAll('.action-buttons > .btn')[1];

    deleteBtn.click();

    expect(deleteItemSpy).toHaveBeenCalledWith(testData);
  });

});
