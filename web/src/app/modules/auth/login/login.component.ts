import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { UserService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const Error = {
  username: {
    pattern: 'Username should not contain any special characters',
  },
  password: {
    pattern:
      'Password must contain a minimum of 6 characters includes atleast 1 alphanumeric and special character',
  },
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  errMsg: any[] = [];

  loginForm!: FormGroup;

  auth = {
    username: '',
    password: '',
  };

  ngOnInit() {}

  onSubmit() {
    this.userService
      .login(this.auth.username, this.auth.password)
      .subscribe((response) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userId', response.userId);
          this.router.navigateByUrl('/');
        } else {
          let config = new MatSnackBarConfig();
          config.duration = 1000;
          this.snackBar.open('Wrong credentials', 'dismiss', config);
        }
      });
  }
}
