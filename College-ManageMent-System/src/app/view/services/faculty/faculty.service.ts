import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FacultyReq } from '../../models/request_dto/faculty-req';
import { FacultyRes } from '../../models/response_dto/faculty-res';


@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE
  addFaculty(data: FacultyReq): Observable<any> {
    return this.http.post("/api/faculty", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getFacultyList(): Observable<FacultyRes[]> {
    return this.http.get<FacultyRes[]>("/api/faculty", { headers: this.getHeaders() });
  }

  // READ ONE
  getFaculty(id: number | string): Observable<FacultyRes> {
    return this.http.get<FacultyRes>(`/api/faculty/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateFaculty(id: number | string, data: FacultyReq): Observable<FacultyRes> {
    return this.http.put<FacultyRes>(`/api/faculty/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchFaculty(id: number | string, data: Partial<FacultyReq>): Observable<FacultyRes> {
    return this.http.patch<FacultyRes>(`/api/faculty/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deleteFaculty(id: number | string): Observable<any> {
    return this.http.delete(`/api/faculty/${id}`, { headers: this.getHeaders() });
  }
}