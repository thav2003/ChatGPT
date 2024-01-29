import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigateService } from '../navigate.service';
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
      const password = this.loginForm.get('password')?.value;
      const confirm_password = this.loginForm.get('confirm_password')?.value;
      const userId = 2;
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzA2NTIwMzE2LCJleHAiOjE3MDY1MjIxMTZ9.aVJ8NsCyWF_DFzasvFuIuUThiBam6WsEgIYpFzFrqMQSUcn4KGTPGP5CQDGPt1JPufR7J7InTXtmiAFEiLuvbw'; // Thay đổi token thực tế
      
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
  
      console.log('Form is valid. Navigating...');
      // Example: this.router.navigate(['/dashboard']);
    } else {
      // If the form is invalid, mark all controls as touched to display error messages.
      this.markFormGroupTouched(this.loginForm);
    }
    alert("Register sucessfully! Please check your mail");
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
