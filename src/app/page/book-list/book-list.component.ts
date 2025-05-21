import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Book } from '../../core/models/book.interface';
import { BookService } from '../../core/services/book.service';
import { MatButton } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  imports: [CommonModule, RouterModule, MatCardModule, MatInputModule, FormsModule, MatButton]
})
export class BookListComponent implements OnInit {
  private bookService = inject(BookService);
  private destroyRef = inject(DestroyRef);

  protected search = '';
  protected books: Book[] = [];

  ngOnInit(): void {
    this.bookService.getBooks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => this.books = data);
  }

  protected get filteredBooks(): Book[] {
    const s = this.search.toLowerCase();
    return this.books.filter(b =>
      b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s)
    );
  }
}
