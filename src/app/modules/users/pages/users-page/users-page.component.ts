import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '@core/models/user.model';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent implements OnInit {
  users: Array<UserModel> = [];

  user: UserModel = {
    id: 0,
    name: '',
    email: '',
    password: '',
    rol: '',
    created_at: new Date()
  };

  emailValidate: string | null = '';

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.emailValidate = localStorage.getItem('user');
  }

  getUser(userEdit: UserModel): void {
    this.user = userEdit;
  }

  reloadUsers(reload: boolean): void {
    if (reload) this.users = this.userService.getUsers();
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/', 'auth']);
  }
}
