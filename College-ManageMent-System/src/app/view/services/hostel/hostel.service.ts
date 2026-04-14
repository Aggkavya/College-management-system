import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HostelReq } from '../../models/request_dto/hostel-req';
import { HostelRes } from '../../models/response_dto/hostel-res';


@Injectable({
  providedIn: 'root'
})
export class HostelService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE
  addHostel(data: HostelReq): Observable<any> {
    return this.http.post("/api/hostels", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getHostels(): Observable<HostelRes[]> {
    return this.http.get<HostelRes[]>("/api/hostels", { headers: this.getHeaders() });
  }

  // READ ONE
  getHostel(id: number | string): Observable<HostelRes> {
    return this.http.get<HostelRes>(`/api/hostels/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateHostel(id: number | string, data: HostelReq): Observable<HostelRes> {
    return this.http.put<HostelRes>(`/api/hostels/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchHostel(id: number | string, data: Partial<HostelReq>): Observable<HostelRes> {
    return this.http.patch<HostelRes>(`/api/hostels/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deleteHostel(id: number | string): Observable<any> {
    return this.http.delete(`/api/hostels/${id}`, { headers: this.getHeaders() });
  }
}