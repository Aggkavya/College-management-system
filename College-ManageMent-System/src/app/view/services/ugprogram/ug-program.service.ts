import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UgProgramReq } from '../../models/request_dto/ug-program-req';
import { UgProgramRes } from '../../models/response_dto/ug-program-res';

@Injectable({
  providedIn: 'root'
})
export class UgProgramService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE
  addProgram(data: UgProgramReq): Observable<any> {
    return this.http.post("/api/ug-programs", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getPrograms(): Observable<UgProgramRes[]> {
    return this.http.get<UgProgramRes[]>("/api/ug-programs", { headers: this.getHeaders() });
  }

  // READ ONE
  getProgram(id: number | string): Observable<UgProgramRes> {
    return this.http.get<UgProgramRes>(`/api/ug-programs/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateProgram(id: number | string, data: UgProgramReq): Observable<UgProgramRes> {
    return this.http.put<UgProgramRes>(`/api/ug-programs/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchProgram(id: number | string, data: Partial<UgProgramReq>): Observable<UgProgramRes> {
    return this.http.patch<UgProgramRes>(`/api/ug-programs/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deleteProgram(id: number | string): Observable<any> {
    return this.http.delete(`/api/ug-programs/${id}`, { headers: this.getHeaders() });
  }
}