import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentReq } from '../../models/request_dto/student-req';
import { StudentRes } from '../../models/response_dto/student-res';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE
  addStudent(data: StudentReq): Observable<any> {
    return this.http.post("/api/students", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getStudents(): Observable<StudentRes[]> {
    return this.http.get<StudentRes[]>("/api/students", { headers: this.getHeaders() });
  }

  // READ ONE
  getStudent(id: number | string): Observable<StudentRes> {
    return this.http.get<StudentRes>(`/api/students/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateStudent(id: number | string, data: StudentReq): Observable<StudentRes> {
    return this.http.put<StudentRes>(`/api/students/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchStudent(id: number | string, data: Partial<StudentReq>): Observable<StudentRes> {
    return this.http.patch<StudentRes>(`/api/students/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deleteStudent(id: number | string): Observable<any> {
    return this.http.delete(`/api/students/${id}`, { headers: this.getHeaders() });
  }
}