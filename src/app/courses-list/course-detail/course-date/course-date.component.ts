import { Component, forwardRef } from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  Validator,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseDateComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseDateComponent),
      multi: true
    }
  ]
})
export class CourseDateComponent implements ControlValueAccessor, Validator {
  public date: FormControl;

  public constructor() {
    this.date = new FormControl('', [ Validators.required ]);
  }

  public onTouched: any = () => {};

  public writeValue(dateStr: string) {
    const date = this.getDateString(dateStr);
    this.date.setValue(date, { emitEvent: false });
  }

  public registerOnChange(fn: any) {
    this.date.valueChanges.subscribe(fn);
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  private getDateString(dateString: string): string {
    return dateString.split('T')[0];
  }

  public validate(control: AbstractControl): ValidationErrors {
    return this.date.invalid ? { required: true } : null;
  }

}
