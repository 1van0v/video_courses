import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State, getLoginStatus } from '../../store/index';
import { login } from '../../store/actions/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public isLoginError$: Observable<boolean>;
  public user = new FormGroup({
    login: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required ])
  });

  public constructor(private store: Store<State>) {
    this.isLoginError$ = this.store.select(getLoginStatus);
  }

  public login(): void {
    this.store.dispatch(login(this.user.value));
    this.user.markAsPristine();
  }

}
