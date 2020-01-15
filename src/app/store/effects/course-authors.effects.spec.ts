import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CourseAuthorsEffects } from './course-authors.effects';

describe('CourseAuthorsEffects', () => {
  const actions$: Observable<any>;
  let effects: CourseAuthorsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseAuthorsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<CourseAuthorsEffects>(CourseAuthorsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
