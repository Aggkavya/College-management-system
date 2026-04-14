import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanteenReq } from '../../models/request_dto/canteen-req';
import { CanteenRes } from '../../models/response_dto/canteen-res';

@Injectable({
  providedIn: 'root'
})
export class CanteenService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE
  addCanteen(data: CanteenReq): Observable<any> {
    return this.http.post("/api/canteens", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getCanteens(): Observable<CanteenRes[]> {
    return this.http.get<CanteenRes[]>("/api/canteens", { headers: this.getHeaders() });
  }

  // READ ONE
  getCanteen(id: number | string): Observable<CanteenRes> {
    return this.http.get<CanteenRes>(`/api/canteens/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateCanteen(id: number | string, data: CanteenReq): Observable<CanteenRes> {
    return this.http.put<CanteenRes>(`/api/canteens/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchCanteen(id: number | string, data: Partial<CanteenReq>): Observable<CanteenRes> {
    return this.http.patch<CanteenRes>(`/api/canteens/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deleteCanteen(id: number | string): Observable<any> {
    return this.http.delete(`/api/canteens/${id}`, { headers: this.getHeaders() });
  }
}