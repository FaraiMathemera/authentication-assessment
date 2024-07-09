import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}auth/`;
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: String, password: String): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(
      this.apiUrl,
      { email: email, password: password },
      { headers }
    );
  }

  getToken(): Observable<any> {
    return this.http.get(this.apiUrl + 'token');
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  register(
    name: String,
    surname: String,
    email: String,
    password: String,
    confirm_password: String
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(
      this.apiUrl + 'register',
      {
        name: name,
        surname: surname,
        email: email,
        password: password,
        confirm_password: confirm_password,
      },
      { headers }
    );
  }
}
