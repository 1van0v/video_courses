import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../../reducers/index';
import { login } from '../../actions/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public userName: string;
  public password: string;
  public isLoginError = false;
  public canLogin: boolean;

  public constructor(private store: Store<State>) { }


  public isFormFilled(): void {
    this.isLoginError = false;
    this.canLogin = Boolean(this.userName) && Boolean(this.password);
  }

  public login(userName: string, password: string): void {
    this.store.dispatch(login({login: userName, password}));
  }

}
