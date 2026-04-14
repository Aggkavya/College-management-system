import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryReq } from '../../models/request_dto/library-req';
import { LibraryRes } from '../../models/response_dto/library-res';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE
  addLibrary(data: LibraryReq): Observable<any> {
    return this.http.post("/api/libraries", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getLibraries(): Observable<LibraryRes[]> {
    return this.http.get<LibraryRes[]>("/api/libraries", { headers: this.getHeaders() });
  }

  // READ ONE
  getLibrary(id: number | string): Observable<LibraryRes> {
    return this.http.get<LibraryRes>(`/api/libraries/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateLibrary(id: number | string, data: LibraryReq): Observable<LibraryRes> {
    return this.http.put<LibraryRes>(`/api/libraries/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchLibrary(id: number | string, data: Partial<LibraryReq>): Observable<LibraryRes> {
    return this.http.patch<LibraryRes>(`/api/libraries/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deleteLibrary(id: number | string): Observable<any> {
    return this.http.delete(`/api/libraries/${id}`, { headers: this.getHeaders() });
  }
}