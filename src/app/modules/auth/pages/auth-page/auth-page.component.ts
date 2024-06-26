import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginModel } from '@core/models/user-login.model';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});

  user: UserLoginModel = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const validateUser = this.authService.validateUserLocalStorage();

    if (validateUser) this.router.navigate(['/']);
    else this.validateForm();
  }

  validateForm(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl(this.user.email, [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl(this.user.password, [
          Validators.required
        ])
      }
    );
  }

  login(): void {
    const { email, password } = this.formLogin.value;
    const loginUser = this.authService.login(email, password);

    if(loginUser) this.router.navigate(['/']);
    else {
      alert('Email or password invalid.');
    }
  }
}
