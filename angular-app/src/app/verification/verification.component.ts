// verify-mail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/verification.service';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-verify-mail',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  imports: [CommonModule],
  standalone: true,
})

export class VerifyMailComponent implements OnInit {
  userId!: number;
  token!: string;
  isLoading: boolean = true;
  verificationResult!: string;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${`eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzA2NTIwOTAwLCJleHAiOjE3MDY1MjEyMDB9.75xvZl60TWUqPWYJEWwcrYJNF-FxLNtrgKM5eAJTFokYmSwCqLzgHtQVHHF5G30yx319rcIjfqMfO14iqMBfLA`}`
    });
    // Lấy thông tin từ URL
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId'];
      this.token = params['token'];
      console.log(this.userId, this.token);
    });

    // Gọi API để xác thực và truyền token vào header
    this.userService.verifyMail(this.userId, this.token).subscribe(
      () => {
        this.isLoading = false;
        this.verificationResult = 'success';

      },
      (error) => {
        console.error(error);
        this.isLoading = false;
        this.verificationResult = 'error';
      }
    );
  }
 
  redirectToLogin() {
    // Chuyển hướng đến trang đăng nhập
    this.router.navigate(['/login']);   
  };
  resendVerificationEmail() {
    // Gọi API để gửi lại email xác thực
    this.userService.resendVerificationEmail(this.userId).subscribe(
      () => {
        // Thành công
        console.log('Email xác thực đã được gửi lại');
      },
      (error) => {
        // Xử lý lỗi
        console.error('Lỗi khi gửi lại email xác thực', error);
      }
    );
  }
}
