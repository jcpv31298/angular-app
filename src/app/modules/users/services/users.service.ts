import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '@core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private router: Router) { }

  getUsers(): Array<UserModel> {
    const usersLocalStorage = localStorage.getItem('users') || null;
    return usersLocalStorage == null ? [] : JSON.parse(usersLocalStorage);
  }

  getUser(id: number): UserModel | undefined {
    const usersLocalStorage: Array<UserModel> = this.getUsers();
    const userSearch: UserModel | undefined = usersLocalStorage.find(user => user.id === id);
    return userSearch;
  }

  addUser(user: UserModel): void {
    const usersLocalStorage: Array<UserModel> = this.getUsers();
    localStorage.setItem('users', JSON.stringify([...usersLocalStorage, user]));

    const validaUserLogin = this.validateUserLocalStorage();

    if(validaUserLogin) this.router.navigate(['/']);
    else {
      localStorage.setItem('user', user.email);
      this.router.navigate(['/']);
    }
  }

  editUser(user: UserModel): void {
    const usersLocalStorage: Array<UserModel> = this.getUsers();
    const index = usersLocalStorage.findIndex(u => u.id === user.id);
    usersLocalStorage[index] = user;
    localStorage.setItem('users', JSON.stringify(usersLocalStorage));
  }

  deleteUser(id: number): void {
    const usersLocalStorage: Array<UserModel> = this.getUsers();
    const usersFiltered: Array<UserModel> = usersLocalStorage.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(usersFiltered));
  }

  validateUserLocalStorage(): boolean {
    const user = localStorage.getItem('user') || null;

    if(user) return true;

    return false;
  }

  validateEmail(email: string): boolean {
    const usersLocalStorage: Array<UserModel> = this.getUsers();
    const userFiltered: Array<UserModel> = usersLocalStorage.filter(user => user.email === email);

    if(userFiltered.length > 0) return true;
    else return false;
  }
}

