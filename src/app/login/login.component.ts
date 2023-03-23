import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  async login() {
    // check if username and password are entered
    if (!(!!this.username && !!this.password)) {
      this.errorMessage = 'Please fill all fields';
      return;
    }

    console.log(
      await this.loginService.login({
        username: this.username,
        password: this.password,
      })
    );


    // call the login service in the login.service.ts
    try {
      // store the result of the login service
      const result = await this.loginService.login({
        username: this.username,
        password: this.password,
      });

      // any result is available then navigate to the home page
      if (result) {
        this.router.navigateByUrl('/home');
      } else {
        this.errorMessage = 'Invalid username or password';
      }

      // if any error occurs then show the error message
    } catch (err) {
      this.errorMessage = 'Login failed';
    }
  }
}
