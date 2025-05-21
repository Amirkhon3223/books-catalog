import { Routes } from '@angular/router';
import { BookListComponent } from './page/book-list/book-list.component';
import { BookDetailComponent } from './page/book-detail/book-detail.component';
import { BookFormComponent } from './components/book-form/book-form.component';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'add', component: BookFormComponent },
  { path: '**', redirectTo: '' }
];
