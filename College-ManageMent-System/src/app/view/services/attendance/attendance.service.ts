import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttendanceReq } from '../../models/request_dto/attendance-req';
import { AttendanceRes } from '../../models/response_dto/attendance-res';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE
  addAttendance(attendance: AttendanceReq): Observable<any> {
    return this.http.post("/api/attendance", attendance, { headers: this.getHeaders() });
  }

  // READ ALL
  getAttendances(): Observable<AttendanceRes[]> {
    return this.http.get<AttendanceRes[]>("/api/attendance", { headers: this.getHeaders() });
  }

  // READ ONE
  getAttendance(id: number | string): Observable<AttendanceRes> {
    return this.http.get<AttendanceRes>(`/api/attendance/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateAttendance(id: number | string, attendance: AttendanceReq): Observable<AttendanceRes> {
    return this.http.put<AttendanceRes>(`/api/attendance/${id}`, attendance, { headers: this.getHeaders() });
  }

  // PATCH
  patchAttendance(id: number | string, attendance: Partial<AttendanceReq>): Observable<AttendanceRes> {
    return this.http.patch<AttendanceRes>(`/api/attendance/${id}`, attendance, { headers: this.getHeaders() });
  }

  // DELETE
  deleteAttendance(id: number | string): Observable<any> {
    return this.http.delete(`/api/attendance/${id}`, { headers: this.getHeaders() });
  }
}