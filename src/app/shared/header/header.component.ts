import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth-service.service';
import { User } from '../../core/user.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user: User;

  public constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.authService.authListener.subscribe(() => {
      this.user = this.authService.getUserInfo();
    });
  }

  public logOut(): void {
    this.authService.logOut();
    this.router.navigate([ 'login' ]);
  }

}
