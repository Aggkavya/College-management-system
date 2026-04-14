import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookReq } from '../../models/request_dto/book-req';
import { BookRes } from '../../models/response_dto/book-res';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE
  addBook(book: BookReq): Observable<any> {
    return this.http.post("/api/books", book, { headers: this.getHeaders() });
  }

  // READ ALL
  getBooks(): Observable<BookRes[]> {
    return this.http.get<BookRes[]>("/api/books", { headers: this.getHeaders() });
  }

  // READ ONE
  getBook(id: number | string): Observable<BookRes> {
    return this.http.get<BookRes>(`/api/books/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateBook(id: number | string, book: BookReq): Observable<BookRes> {
    return this.http.put<BookRes>(`/api/books/${id}`, book, { headers: this.getHeaders() });
  }

  // PATCH
  patchBook(id: number | string, book: Partial<BookReq>): Observable<BookRes> {
    return this.http.patch<BookRes>(`/api/books/${id}`, book, { headers: this.getHeaders() });
  }

  // DELETE
  deleteBook(id: number | string): Observable<any> {
    return this.http.delete(`/api/books/${id}`, { headers: this.getHeaders() });
  }
}