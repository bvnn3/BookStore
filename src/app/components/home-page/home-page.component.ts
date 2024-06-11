import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  books: Book[] = [];
  isLoggedIn = false;
  constructor(private bookService: BookService, private userService: UserService) { }
  
  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
    this.isLoggedIn = this.userService.isLoggedIn();
  }

}
