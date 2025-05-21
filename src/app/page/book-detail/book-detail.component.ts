import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BookService } from '../../core/services/book.service';
import { Book } from '../../core/models/book.interface';
import { MatButton } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  imports: [CommonModule, MatCardModule, MatButton, RouterLink]
})
export class BookDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);

  protected book?: Book;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.book = this.bookService.getBook(id);
  }
}
