import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor() { }

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/user/signup';


  userSignup(payload: any) {
    return this.httpClient.post(`${this.apiUrl}`, payload);
  }


}
