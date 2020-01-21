import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { User } from '../../core/user.class';
import { State, getUser } from '../../store/index';
import { logOut } from '../../store/actions/login.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public user$: Observable<User>;
  public language: FormControl;
  private translations = ['en', 'ru'];

  public constructor(
    private store: Store<State>,
    public translate: TranslateService
  ) {
    this.user$ = this.store.select(getUser);
    this.language = new FormControl('');
    this.language.valueChanges.subscribe(data => {
      this.translate.use(data);
    });

    this.translate.setDefaultLang(this.translations[0]);
    this.translate.addLangs(this.translations);

    this.language.setValue(this.translations[0]);
  }

  public logOut(): void {
    this.store.dispatch(logOut());
  }

}
