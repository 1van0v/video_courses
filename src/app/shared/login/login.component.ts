import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userName: string;
  public password: string;
  public isLoginError = false;
  public canLogin: boolean;

  public constructor(
    private authService: AuthService,
    private router: Router
  ) { }

    public ngOnInit() {
      const authenticated = this.authService.isAuthenticated();
      if (authenticated || this.authService.lookupLocalStorage()) {
        this.router.navigate([ '' ]);
      }
    }

  public isFormFilled(): void {
    this.isLoginError = false;
    this.canLogin = Boolean(this.userName) && Boolean(this.password);
  }

  public login(userName: string, password: string): void {
    this.authService.logIn(userName, password)
      .subscribe(
        () => this.router.navigate([ 'courses' ]),
        () => {
          this.password = '';
          this.userName = '';
          this.isLoginError = true;
          this.canLogin = false;
        }
      );
  }

}
