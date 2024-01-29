import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigateService } from '../navigate.service';
import windowStore from '../../../../share/store/store';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,RouterOutlet, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
   loginForm: FormGroup;

  constructor(private fb: FormBuilder, private navigateService: NavigateService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }

  onSubmitButtonClicked() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      const confirm_password = this.loginForm.get('confirm_password')?.value;

      if (!confirm_password) {
        // Handle empty confirm password
        console.error('Confirm Password is required');
        return;
      }

      if (password !== confirm_password) {
        // Handle password mismatch
        console.error('Passwords do not match');
        return;
      }


      windowStore.register({ email, password, confirmPassword:confirm_password }).subscribe({
        next:(response) => {
          console.log(response)
          alert("Register sucessfully! Please check your mail");
        },
        error:(error) => {
          console.error('Đăng kí thất bại:', error);
          // Xử lý lỗi đăng nhập ở đây (hiển thị thông báo lỗi, v.v.)
          alert(`Cannot login, error: ${error.message}`);
        }
      });
      // Example: this.router.navigate(['/dashboard']);
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
  navigateToLogIn() {
    // Chuyển hướng đến trang đăng ký
    this.navigateService.navigate('/login');
  }

}
