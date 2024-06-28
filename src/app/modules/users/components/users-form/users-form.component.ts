import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '@core/models/user.model';
import { UsersService } from '@modules/users/services/users.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css'
})
export class UsersFormComponent implements OnInit {
  formAddUser: FormGroup = new FormGroup({});

  @Output() saveUser: EventEmitter<boolean> = new EventEmitter();

  @Input() emailValidate: string | null = '';

  @Input() user: UserModel = {
    id: 0,
    name: '',
    email: '',
    password: '',
    rol: '',
    created_at: new Date()
  }

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.validateForm();
  }

  validateForm(): void {
    this.formAddUser = new FormGroup(
      {
        name: new FormControl(this.user.name, [
          Validators.required,
        ]),
        email: new FormControl(this.user.email, [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl(this.user.password, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ]),
        confirmPassword: new FormControl(this.user.password, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ]),
        rol: new FormControl(this.user.rol, [
          Validators.required,
        ])
      }
    );
  }

  sendForm(): boolean {
    const { name, email, password, confirmPassword, rol } = this.formAddUser.value;

    if (password !== confirmPassword) {
      alert('Passwords not matches');
      return false;
    }

    if (this.user.id > 0) {
      this.user = {
        id: this.user.id,
        name: name,
        email: email,
        password: password,
        rol: rol,
        created_at: this.user.created_at
      }

      this.usersService.editUser(this.user);
    }
    else {
      const validateEmail = this.usersService.validateEmail(email);

      if(validateEmail) {
        alert('Email already exists');
        return false;
      }

      this.user = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        rol: rol,
        created_at: new Date()
      }

      this.usersService.addUser(this.user);
    }
    this.clearUser();

    this.saveUser.emit(true);

    return true;
  }

  clearUser(): void {
    this.formAddUser.reset({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      rol: ''
    });

    this.user = {
      id: 0,
      name: '',
      email: '',
      password: '',
      rol: '',
      created_at: new Date()
    }
  }

}
