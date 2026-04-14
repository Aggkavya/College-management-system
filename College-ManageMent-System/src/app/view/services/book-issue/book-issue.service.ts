import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookIssueReq } from '../../models/request_dto/book-issue-req';
import { BookIssueRes } from '../../models/response_dto/book-issue-res';

@Injectable({
  providedIn: 'root'
})
export class BookIssueService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE (Issue Book)
  issueBook(data: BookIssueReq): Observable<any> {
    return this.http.post("/api/book-issues", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getAllIssues(): Observable<BookIssueRes[]> {
    return this.http.get<BookIssueRes[]>("/api/book-issues", { headers: this.getHeaders() });
  }

  // READ ONE
  getIssue(id: number | string): Observable<BookIssueRes> {
    return this.http.get<BookIssueRes>(`/api/book-issues/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateIssue(id: number | string, data: BookIssueReq): Observable<BookIssueRes> {
    return this.http.put<BookIssueRes>(`/api/book-issues/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchIssue(id: number | string, data: Partial<BookIssueReq>): Observable<BookIssueRes> {
    return this.http.patch<BookIssueRes>(`/api/book-issues/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deleteIssue(id: number | string): Observable<any> {
    return this.http.delete(`/api/book-issues/${id}`, { headers: this.getHeaders() });
  }
}