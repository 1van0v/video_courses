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
  selector: 'app-course-length',
  templateUrl: './course-length.component.html',
  styleUrls: ['./course-length.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseDurationComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseDurationComponent),
      multi: true
    }
  ]
})
export class CourseDurationComponent implements ControlValueAccessor, Validator {
  public length: FormControl;

  public constructor() {
    this.length = new FormControl('', [ Validators.required, Validators.min(0) ]);
  }

  public onTouched: any = () => {};

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public registerOnChange(fn: any) {
    this.length.valueChanges.subscribe(fn);
  }

  public writeValue(length: number) {
    this.length.setValue(length);
  }

  public validate(control: AbstractControl): ValidationErrors {
    return this.length.invalid ? { required: true } : null;
  }

}
