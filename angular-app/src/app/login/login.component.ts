import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigateService } from '../navigate.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterOutlet, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   loginForm: FormGroup;

  constructor(private fb: FormBuilder, private navigateService: NavigateService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmitButtonClicked() {
    if (this.loginForm.valid) {
      console.log('Form is valid. Navigating...');
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
  navigateToSignUp() {
    // Chuyển hướng đến trang đăng ký
    this.navigateService.navigate('/register');
  }

}
