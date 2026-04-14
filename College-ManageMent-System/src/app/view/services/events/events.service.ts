import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsReq } from '../../models/request_dto/events-req';
import { EventsRes } from '../../models/response_dto/events-res';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  // CREATE
  addEvent(data: EventsReq): Observable<any> {
    return this.http.post("/api/events", data, { headers: this.getHeaders() });
  }

  // READ ALL
  getEvents(): Observable<EventsRes[]> {
    return this.http.get<EventsRes[]>("/api/events", { headers: this.getHeaders() });
  }

  // READ ONE
  getEvent(id: number | string): Observable<EventsRes> {
    return this.http.get<EventsRes>(`/api/events/${id}`, { headers: this.getHeaders() });
  }

  // UPDATE (PUT)
  updateEvent(id: number | string, data: EventsReq): Observable<EventsRes> {
    return this.http.put<EventsRes>(`/api/events/${id}`, data, { headers: this.getHeaders() });
  }

  // PATCH
  patchEvent(id: number | string, data: Partial<EventsReq>): Observable<EventsRes> {
    return this.http.patch<EventsRes>(`/api/events/${id}`, data, { headers: this.getHeaders() });
  }

  // DELETE
  deleteEvent(id: number | string): Observable<any> {
    return this.http.delete(`/api/events/${id}`, { headers: this.getHeaders() });
  }
}