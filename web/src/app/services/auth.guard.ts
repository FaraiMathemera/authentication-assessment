import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private http: HttpClient,
    private router: Router,
    private JwtHelper: JwtHelperService
  ) {}

  jwtHelper = new JwtHelperService();
  token = localStorage.getItem('authToken');
  public canActivate() {
    return this.token ? !this.jwtHelper.isTokenExpired(this.token) : false;
  }
  public canActivateChild() {
    return this.token ? !this.jwtHelper.isTokenExpired(this.token) : false;
  }
}
