import { Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor() {}

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/user/login';
  private router = inject(Router);

  loginUser(payload: any) {
    return this.httpClient.post(this.apiUrl, payload);
  }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/home']);
  }


}