import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3500/organizations';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getIndividualUser(id: string): Observable<any> {    // Need to add
    return this.http.get(API_URL + '/user/' + id);
  }

  getIndividualOrganization(id: string): Observable<any> {    // Need to add
    return this.http.get(API_URL + '/organization/' + id);
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  createOrganization(client: any): Observable<any> {
    return this.http.post(API_URL, { ...client }, httpOptions);
  }

  updateOrganization(client: any): Observable<any> {  // Need to add
    return this.http.post(API_URL, { ...client }, httpOptions);
  }

  getOrganizations(): Observable<any> {
    return this.http.get(API_URL);
  }
}
