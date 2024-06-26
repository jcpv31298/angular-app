import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserModel } from '@core/models/user.model';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  @Output() userToEdit: EventEmitter<UserModel> = new EventEmitter();

  @Input() users: Array<UserModel> = [];

  @Input() emailValidate: string | null = '';

  constructor(private usersService: UsersService) { }

  getUsers(): void {
    this.users = this.usersService.getUsers();
  }

  getUser(id: number): void {
    this.userToEdit.emit(this.usersService.getUser(id));
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id);
    this.getUsers();
  }
}
