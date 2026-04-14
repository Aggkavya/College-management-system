import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PgStudentReq } from '../../models/request_dto/pg-student-req';
import { PgStudentRes } from '../../models/response_dto/pg-student-res';

@Injectable({
  providedIn: 'root'
})
export class PgStudentService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE (register PG student details)
  addPgStudent(data: PgStudentReq): Observable<any> {
    return this.http.post("/api/pg-students", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getPgStudents(): Observable<PgStudentRes[]> {
    return this.http.get<PgStudentRes[]>("/api/pg-students", { headers: this.getHeaders() });
  }

  // READ ONE
  getPgStudent(id: number | string): Observable<PgStudentRes> {
    return this.http.get<PgStudentRes>(`/api/pg-students/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updatePgStudent(id: number | string, data: PgStudentReq): Observable<PgStudentRes> {
    return this.http.put<PgStudentRes>(`/api/pg-students/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchPgStudent(id: number | string, data: Partial<PgStudentReq>): Observable<PgStudentRes> {
    return this.http.patch<PgStudentRes>(`/api/pg-students/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deletePgStudent(id: number | string): Observable<any> {
    return this.http.delete(`/api/pg-students/${id}`, { headers: this.getHeaders() });
  }
}