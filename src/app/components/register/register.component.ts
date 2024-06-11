import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { id: 0, email: '', username: '', password: '', admin: 0 };
  errorMessage: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onRegister(): void {
    if (this.isValidRegistration()) {
      this.userService.checkEmailExists(this.user.email).subscribe(
        emailExists => {
          if (emailExists) {
            this.errorMessage = 'Email is already in use';
          } else {
            this.userService.register(this.user).subscribe(
              response => {
                this.router.navigate(['/login']);
              },
              error => {
                this.errorMessage = 'Registration failed. Please try again.';
              }
            );
          }
        }
      );
    } else {
      this.errorMessage = 'Invalid registration data';
    }
  }

  private isValidRegistration(): boolean {
    return (
      this.user.email.trim() !== '' &&
      this.user.username.trim() !== '' &&
      this.user.password.trim() !== '' &&
      this.user.password === this.confirmPassword
    );
  }
}
