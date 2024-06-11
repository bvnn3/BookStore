import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  showPasswordFields: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const userId = this.userService.getCurrentUserById();
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  togglePasswordFields(): void {
    this.showPasswordFields = !this.showPasswordFields;
  }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords must match');
      return;
    }

    if (this.user) {
      this.user.password = this.newPassword;
      this.userService.updateUser(this.user).subscribe(
        (data) => {
          alert('Password changed');
          this.router.navigate(['/homePage']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
