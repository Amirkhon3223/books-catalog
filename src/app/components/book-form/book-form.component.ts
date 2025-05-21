import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../core/services/book.service';

@Component({
  standalone: true,
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class BookFormComponent {
  private fb = inject(FormBuilder);
  private bookService = inject(BookService);

  protected form = this.createForm();

  protected onSubmit(): void {
    if (this.form.valid) {
      const value = this.form.getRawValue();
      const newBook = {
        id: Date.now(),
        title: value.title ?? '',
        author: value.author ?? '',
        description: value.description ?? ''
      };
      this.bookService.addBook(newBook);
      this.form.reset();
    }
  }

  private createForm() {
    return this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
}
