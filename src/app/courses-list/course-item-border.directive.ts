import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appCreationDate]'
})
export class CourseItemBorderDirective implements OnInit {

  public constructor(private el: ElementRef) { }

  @Input()
  private appCreationDate: number;

  public ngOnInit() {
    this.addBorder(this.appCreationDate);
  }

  private addBorder(createdAt: number): void {
    const { classList } = this.el.nativeElement;
    const currentDate = Date.now();
    const newDeadLine = new Date();
    newDeadLine.setDate(newDeadLine.getDate() - 14);

    if (currentDate < createdAt) {
      classList.add('course_upcoming');
    } else if (createdAt > newDeadLine.valueOf()) {
      classList.add('course_new');
    }
  }
}
