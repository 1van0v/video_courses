import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from './index';
import { environment } from '../../environments/environment';
import { LoginEffects } from './effects/login.effects';
import { CoursesListEffects } from './effects/courses-list.effects';
import { CourseAuthorsEffects } from './effects/course-authors.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([LoginEffects, CoursesListEffects, CourseAuthorsEffects])
  ]
})
export class AppStoreModule { }
