import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardStats } from '../../models/dashboard-stats';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // GET DASHBOARD STATS
  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>("/api/dashboard/stats", {
      headers: this.getHeaders()
    });
  }
}