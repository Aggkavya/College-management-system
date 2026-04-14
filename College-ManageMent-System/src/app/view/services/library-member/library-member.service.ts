import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryMemberReq } from '../../models/request_dto/library-member-req';
import { LibraryMemberRes } from '../../models/response_dto/library-member-res';

@Injectable({
  providedIn: 'root'
})
export class LibraryMemberService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE (register member)
  addMember(data: LibraryMemberReq): Observable<any> {
    return this.http.post("/api/library-members", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getMembers(): Observable<LibraryMemberRes[]> {
    return this.http.get<LibraryMemberRes[]>("/api/library-members", { headers: this.getHeaders() });
  }

  // READ ONE
  getMember(id: number | string): Observable<LibraryMemberRes> {
    return this.http.get<LibraryMemberRes>(`/api/library-members/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateMember(id: number | string, data: LibraryMemberReq): Observable<LibraryMemberRes> {
    return this.http.put<LibraryMemberRes>(`/api/library-members/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchMember(id: number | string, data: Partial<LibraryMemberReq>): Observable<LibraryMemberRes> {
    return this.http.patch<LibraryMemberRes>(`/api/library-members/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deleteMember(id: number | string): Observable<any> {
    return this.http.delete(`/api/library-members/${id}`, { headers: this.getHeaders() });
  }
}