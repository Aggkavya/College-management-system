import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultsReq } from '../../models/request_dto/results-req';
import { ResultsRes } from '../../models/response_dto/results-res';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE (add result)
  addResult(data: ResultsReq): Observable<any> {
    return this.http.post("/api/results", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getResults(): Observable<ResultsRes[]> {
    return this.http.get<ResultsRes[]>("/api/results", { headers: this.getHeaders() });
  }

  // READ ONE
  getResult(id: number | string): Observable<ResultsRes> {
    return this.http.get<ResultsRes>(`/api/results/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateResult(id: number | string, data: ResultsReq): Observable<ResultsRes> {
    return this.http.put<ResultsRes>(`/api/results/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchResult(id: number | string, data: Partial<ResultsReq>): Observable<ResultsRes> {
    return this.http.patch<ResultsRes>(`/api/results/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deleteResult(id: number | string): Observable<any> {
    return this.http.delete(`/api/results/${id}`, { headers: this.getHeaders() });
  }
}