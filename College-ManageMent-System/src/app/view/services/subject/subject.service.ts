import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectReq } from '../../models/request_dto/subject-req';
import { SubjectRes } from '../../models/response_dto/subject-res';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE
  addSubject(data: SubjectReq): Observable<any> {
    return this.http.post("/api/subjects", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getSubjects(): Observable<SubjectRes[]> {
    return this.http.get<SubjectRes[]>("/api/subjects", { headers: this.getHeaders() });
  }

  // READ ONE
  getSubject(id: number | string): Observable<SubjectRes> {
    return this.http.get<SubjectRes>(`/api/subjects/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateSubject(id: number | string, data: SubjectReq): Observable<SubjectRes> {
    return this.http.put<SubjectRes>(`/api/subjects/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchSubject(id: number | string, data: Partial<SubjectReq>): Observable<SubjectRes> {
    return this.http.patch<SubjectRes>(`/api/subjects/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deleteSubject(id: number | string): Observable<any> {
    return this.http.delete(`/api/subjects/${id}`, { headers: this.getHeaders() });
  }
}