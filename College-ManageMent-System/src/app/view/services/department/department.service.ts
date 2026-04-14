import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../../models/department';
import { Observable } from 'rxjs';
import { DepartmentResponse } from '../../models/response_dto/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  constructor(private http: HttpClient) { }
  addDept(department: DepartmentResponse): Observable<any> {
    return this.http.post("/api/departments", department, { headers: this.getHeaders() });
  }
  getDepts(): Observable<DepartmentResponse[]> {
    return this.http.get<DepartmentResponse[]>("/api/departments", { headers: this.getHeaders() });
  }

  getDept(id: number | string): Observable<DepartmentResponse> {
    return this.http.get<DepartmentResponse>(`/api/departments/${id}`, { headers: this.getHeaders() });
  }

  updateDept(id: number | string, department: Department): Observable<DepartmentResponse> {
    return this.http.put<DepartmentResponse>(`/api/departments/${id}`, department, { headers: this.getHeaders() });
  }

  patchDept(id: number | string, department: Partial<Department>): Observable<DepartmentResponse> {
    return this.http.patch<DepartmentResponse>(`/api/departments/${id}`, department, { headers: this.getHeaders() });
  }

  deleteDept(id: number | string): Observable<any> {
    return this.http.delete(`/api/departments/${id}`, { headers: this.getHeaders() });
  }
}
