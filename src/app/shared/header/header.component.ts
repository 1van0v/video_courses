import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth-service.service';
import { User } from '../../core/user.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user: User;

  public constructor( private authService: AuthService ) { }

  public ngOnInit(): void {
    this.authService.authListener.subscribe(
      (user: User) => { this.user = user; }
    );
  }

  public logOut(): void {
    this.authService.logOut();
  }

}
