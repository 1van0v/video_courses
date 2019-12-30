import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../core/user.class';
import { State, getUser } from '../../reducers/index';
import { logOut } from '../../actions/login.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public user$: Observable<User>;

  public constructor( private store: Store<State> ) {
    this.user$ = this.store.select(getUser);
  }

  public logOut(): void {
    this.store.dispatch(logOut());
  }

}
