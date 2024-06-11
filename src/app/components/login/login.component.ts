// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from '../../services/user.service';
// import { User } from '../../models/user';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   user: User = {id: 0, email: '', username: '', password: '', admin: 0};
//   errorMessage: string = '';

//   constructor(private userService: UserService, private router: Router) {}

//   onLogin(): void {
//     this.userService.login(this.user).subscribe(
//       response => {
//         this.userService.setToken(response.jwt);
//         this.router.navigate(['/addBook']);
//       },
//       error => {
//         this.errorMessage = 'Invalid email or password';
//       }
//     );
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = { id: 0, email: '', username: '', password: '', admin: 0 };
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin(): void {
    this.userService.login(this.user).subscribe(
      response => {
        this.userService.setToken(response.jwt);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/homePage']);
      },
      error => {
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
