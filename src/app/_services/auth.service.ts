import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:3500/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  private isLoggedInValue: boolean = false;


  isLoggedIn(): boolean {
    this.isLoggedInValue = !!this.tokenStorageService.getToken();
    return this.isLoggedInValue;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        email: username,
        password,
      },
      httpOptions
    );
  }
  getUsers():Observable<any> {
    return this.http.get(AUTH_API, httpOptions);
  }
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        userName: username,
        email,
        password,
      },
      httpOptions
    );
  }
}
