// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://172.188.16.85:8080/api/v1/user'; // Điều chỉnh API endpoint

  constructor(private http: HttpClient) {}

  verifyMail(userId: number, token: string): Observable<any> {
    console.log(token)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/verify?userId=${userId}&token=${token}`;
    return this.http.get(url, { headers });
  }
  resendVerificationEmail(userId: number): Observable<any> {
    const url = `${this.apiUrl}`;
    
    // Gửi yêu cầu API để gửi lại email xác thực
    return this.http.post(url, { userId });
  }
  
}
