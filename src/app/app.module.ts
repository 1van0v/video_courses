import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { CoursesListModule } from './courses-list/courses-list.module';
import { SharedModule } from './shared/shared.module';

import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { LoginEffects } from './effects/login.effects';
import { CoursesListEffects } from './effects/courses-list.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CoursesListModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([LoginEffects, CoursesListEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
