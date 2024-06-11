import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  email: string | null = null;
  username: string | null = null;
  isAdmin = false;
  

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user')!);
      this.email = user.email;
      this.username = user.username;
      this.isAdmin = user.admin === 1;
    }
  }
  

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/homePage']);
  }
}