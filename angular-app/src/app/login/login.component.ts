import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigateService } from '../navigate.service';
import { Subscription } from 'rxjs';
import windowStore from "../../../../share/store/store"
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterOutlet, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  counterValue: number | undefined;
  counterSubscription = new Subscription();

  constructor(
    private fb: FormBuilder, 
    private navigateService: NavigateService, 
    private cdr: ChangeDetectorRef, 
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
  }

  onSubmitButtonClicked() {
    if (this.loginForm.valid || true) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      console.log(email)
      console.log(password)
      windowStore.login({ email, password }).subscribe({
        next:(response) => {
          // Xử lý kết quả đăng nhập ở đây
          windowStore.saveUser(response);
          // Sau khi đăng nhập thành công, có thể thực hiện các thao tác khác như chuyển hướng trang
          this.navigateService.navigate('/');
        }, 
        error:(error) => {
          console.error('Đăng nhập thất bại:', error);
          // Xử lý lỗi đăng nhập ở đây (hiển thị thông báo lỗi, v.v.)
          alert(`Cannot login, error: ${error.message}`);
        }
      });
    } else {
      // If the form is invalid, mark all controls as touched to display error messages.
      this.markFormGroupTouched(this.loginForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
  navigateToSignUp() {
    // Chuyển hướng đến trang đăng ký
    this.navigateService.navigate('/register');
  }

}
