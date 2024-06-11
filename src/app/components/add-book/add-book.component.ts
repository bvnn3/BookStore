import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { Publisher } from 'src/app/models/publisher';
import { Writer } from 'src/app/models/writer';
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  addBookForm: FormGroup;
  writers: Writer[] = [];
  publishers: Publisher[] = [];

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.addBookForm = this.fb.group({
      bookTitle: ['', Validators.required],
      bookImageUrl: ['', Validators.required],
      bookGenre: ['', Validators.required],
      price: ['', Validators.required],
      bookYear: ['', Validators.required],
      writer: [null, Validators.required],
      publisher: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadWriters();
    this.loadPublishers();
  }

  loadWriters(): void {
    this.bookService.getWriters().subscribe(data => {
      this.writers = data;
    });
  }

  loadPublishers(): void {
    this.bookService.getPublishers().subscribe(data => {
      this.publishers = data;
    });
  }

  onSubmit(): void {
    if (this.addBookForm.valid) {
      const formValues = this.addBookForm.value;
      const newBook: Book = {
        bookTitle: formValues.bookTitle,
        bookImageUrl: formValues.bookImageUrl,
        bookGenre: formValues.bookGenre,
        price: formValues.price,
        bookYear: formValues.bookYear,
        writer: {
          id: formValues.writer,
          writerName: '',
          writerState: '',
          writerSurname: ''
        },
        publisher: {
          id: formValues.publisher,
          publisherName: ''
        },
        id: 0
      };
      this.bookService.addBook(newBook).subscribe(
        response => {
          console.log('Book added successfully', response);
          this.addBookForm.reset();
        },
        error => {
          console.error('Error adding book', error);
        }
      );
    }
  }
}