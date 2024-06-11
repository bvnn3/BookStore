import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Writer } from 'src/app/models/writer';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-writer',
  templateUrl: './add-writer.component.html',
  styleUrls: ['./add-writer.component.css']
})
export class AddWriterComponent implements OnInit{
  addWriterForm: FormGroup;
  

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.addWriterForm = this.fb.group({
      writerName: ['', Validators.required],
      writerSurname: ['', Validators.required],
      writerState: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.addWriterForm.valid) {
      const formValues = this.addWriterForm.value;
      const newBook: Writer = {
        writerName: formValues.writerName,
        writerSurname: formValues.writerSurname,
        writerState: formValues.writerState,
        id: 0
      };
      this.bookService.addWriter(newBook).subscribe(
        response => {
          console.log('Book added successfully', response);
          this.addWriterForm.reset();
        },
        error => {
          console.error('Error adding book', error);
        }
      );
    }
  }
}
