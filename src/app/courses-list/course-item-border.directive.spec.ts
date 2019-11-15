import { CourseItemBorderDirective } from './course-item-border.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('CourseItemBorderDirective', () => {
  let element: any;

  @Component({
    template: `
      <div id="test1" [appCreationDate]="${shiftDate(-20)}"></div>
      <div id="test2" [appCreationDate]="${shiftDate(-1)}"></div>
      <div id="test3" [appCreationDate]="${shiftDate(2)}"></div>
    `
  })
  class TestComponent {}

  let fixture: ComponentFixture<TestComponent>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestComponent, CourseItemBorderDirective ]
    })
    .createComponent(TestComponent);
    fixture.detectChanges();
  });

  beforeEach(() => {
    const debugElement = fixture.debugElement.query(By.directive(CourseItemBorderDirective));
    element = debugElement.nativeElement;
  });

  it('should not add any class', () => {
    expect(getElementClass('test1')).toEqual(null);
  });

  it('should add new class', () => {
    expect(getElementClass('test2')).toEqual('course_new');
  });

  it('should add upcoming class', () => {
    expect(getElementClass('test3')).toEqual('course_upcoming');
  });

  function shiftDate(shift: number): number {
    const date = new Date();
    date.setDate(date.getDate() + shift);
    return date.valueOf();
  }

  function getElementClass(id: string): string {
    const debugElement = fixture.debugElement.query(By.css('#' + id));
    return debugElement.nativeElement.getAttribute('class');
  }
});
