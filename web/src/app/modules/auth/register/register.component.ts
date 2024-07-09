import { Component } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  auth = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  ngOnInit() {}

  onSubmit() {
    if (this.auth.password === this.auth.confirm_password) {
      this.userService
        .register(
          this.auth.name,
          this.auth.surname,
          this.auth.email,
          this.auth.password,
          this.auth.confirm_password
        )
        .subscribe();
      let config = new MatSnackBarConfig();
      config.duration = 1000;
      this.snackBar.open('User created', 'dismiss', config);
      this.router.navigateByUrl('/login');
    } else {
      let config = new MatSnackBarConfig();
      config.duration = 1000;
      this.snackBar.open('Passwords do not match!', 'dismiss', config);
    }
  }
}
