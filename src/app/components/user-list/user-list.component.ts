import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
  deleteUser(userId: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter(user => user.id !== userId);
      });
    }
  }
  updateUser(userId: number): void {
    this.selectedUser = this.users.find((user: User) => user.id === userId) || null;
  }
  cancelUpdate(): void {
    this.selectedUser = null;
  }

  submitUpdate(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser).subscribe(updatedUser => {
        const index = this.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.selectedUser = null;
      });
    }
  }
}
