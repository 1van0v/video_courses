import { Component, forwardRef } from '@angular/core';
import {
  FormGroup,
  ControlValueAccessor,
  Validator,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  Validators,
  FormBuilder,
  FormArray,
  FormControl
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { Author } from './course-authors.model';
import { State, getAuthors } from '../../../store/index';
import { getSuggestedAuthors, resetSuggestedAuthors } from '../../../store/actions/course-authors.actions';

@Component({
  selector: 'app-course-authors',
  templateUrl: './course-authors.component.html',
  styleUrls: ['./course-authors.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseAuthorsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseAuthorsComponent),
      multi: true
    }
  ]
})
export class CourseAuthorsComponent implements ControlValueAccessor, Validator {
  public authorsForm: FormGroup;
  public suggestedAuthors$: Observable<Author[]>;

  public constructor(
    private formBuilder: FormBuilder,
    private store: Store<State>
  ) {
    this.authorsForm = this.formBuilder.group({
      authors: this.formBuilder.array([]),
      authorSearchControl: this.formBuilder.control('')
    });

    this.authorSearchControl.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe((searchString) => {
      const action = searchString ? getSuggestedAuthors({ textFragment: searchString }) : resetSuggestedAuthors();
      this.store.dispatch(action);
    });

    this.suggestedAuthors$ = this.store.select(getAuthors);
  }

  public get authors(): FormArray {
    return this.authorsForm.get('authors') as FormArray;
  }

  public get authorSearchControl(): FormControl {
    return this.authorsForm.get('authorSearchControl') as FormControl;
  }

  public onTouched = () => {};

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public registerOnChange(fn: any): void {
    this.authorsForm.valueChanges.subscribe(fn);
  }

  public writeValue(authors: Author[]): void {
    authors.forEach(author => this.pushAuthor(author));
  }

  private pushAuthor(author: Author): void {
    this.authors.push(this.formBuilder.group(author));
  }

  public removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  public validate(control: AbstractControl): ValidationErrors {
    return this.authors.value.length ? null : { required: true };
  }

  public addAuthor(event: MouseEvent): void {
    const elementRef = event.target as HTMLDivElement;
    const [ name, lastName ] = elementRef.innerText.split(' ');
    const { id } = elementRef.dataset;
    this.pushAuthor({ id, name, lastName });
    this.authorSearchControl.setValue('');
  }

}
