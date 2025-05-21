import { inject, Injectable, DestroyRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Book } from '../models/book.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookService {
  private destroyRef = inject(DestroyRef);
  private http = inject(HttpClient);
  private books$ = new BehaviorSubject<Book[]>([]);

  constructor() {
    this.http.get<Book[]>(environment.booksDataUrl)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => this.books$.next(data));
  }

  public getBooks(): Observable<Book[]> {
    return this.books$.asObservable();
  }

  public getBook(id: number): Book | undefined {
    return this.books$.value.find(b => b.id === id);
  }

  public addBook(book: Book): void {
    const books = [...this.books$.value, book];
    this.books$.next(books);
  }
}
