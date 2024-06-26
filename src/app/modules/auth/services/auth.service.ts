import { Injectable } from '@angular/core';
import { UserLoginModel } from '@core/models/user-login.model';
import { UsersService } from '@modules/users/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UsersService) { }

  validateUserLocalStorage(): boolean {
    const user = localStorage.getItem('user') || null;

    if(user) return true;

    return false;
  }

  login(email: string, password: string): boolean {
    const users = this.userService.getUsers();
    const userLogin = users.filter(u => u.email === email && u.password === password);

    if(userLogin.length > 0) {
      localStorage.setItem('user', email);
      return true;
    }

    return false;
  }
}
