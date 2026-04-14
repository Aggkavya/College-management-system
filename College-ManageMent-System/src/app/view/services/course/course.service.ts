import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseReq } from '../../models/request_dto/course-req';
import { CourseRes } from '../../models/response_dto/course-res';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE
  addCourse(data: CourseReq): Observable<any> {
    return this.http.post("/api/courses", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getCourses(): Observable<CourseRes[]> {
    return this.http.get<CourseRes[]>("/api/courses", { headers: this.getHeaders() });
  }

  // READ ONE
  getCourse(id: number | string): Observable<CourseRes> {
    return this.http.get<CourseRes>(`/api/courses/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateCourse(id: number | string, data: CourseReq): Observable<CourseRes> {
    return this.http.put<CourseRes>(`/api/courses/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchCourse(id: number | string, data: Partial<CourseReq>): Observable<CourseRes> {
    return this.http.patch<CourseRes>(`/api/courses/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deleteCourse(id: number | string): Observable<any> {
    return this.http.delete(`/api/courses/${id}`, { headers: this.getHeaders() });
  }
}