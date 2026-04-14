import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeesReq } from '../../models/request_dto/fees-req';
import { FeesRes } from '../../models/response_dto/fees-res';

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE (record fee / transaction)
  addFees(data: FeesReq): Observable<any> {
    return this.http.post("/api/fees", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getAllFees(): Observable<FeesRes[]> {
    return this.http.get<FeesRes[]>("/api/fees", { headers: this.getHeaders() });
  }

  // READ ONE
  getFees(id: number | string): Observable<FeesRes> {
    return this.http.get<FeesRes>(`/api/fees/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateFees(id: number | string, data: FeesReq): Observable<FeesRes> {
    return this.http.put<FeesRes>(`/api/fees/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchFees(id: number | string, data: Partial<FeesReq>): Observable<FeesRes> {
    return this.http.patch<FeesRes>(`/api/fees/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deleteFees(id: number | string): Observable<any> {
    return this.http.delete(`/api/fees/${id}`, { headers: this.getHeaders() });
  }
}