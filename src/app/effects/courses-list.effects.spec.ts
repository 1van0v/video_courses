import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CoursesListEffects } from './courses-list.effects';

describe('CoursesListEffects', () => {
  const actions$: Observable<any>;
  let effects: CoursesListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesListEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<CoursesListEffects>(CoursesListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
