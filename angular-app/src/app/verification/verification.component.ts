// verify-mail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/verification.service';

@Component({
  selector: 'app-verify-mail',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  standalone: true,
})
export class VerifyMailComponent implements OnInit {
  userId!: number;
  token!: string;
  isLoading: boolean = true;
  verificationResult!: string;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    // Lấy thông tin từ URL
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId'];
      this.token = params['token'];
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
    // this.router.navigate(['/login']);
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
