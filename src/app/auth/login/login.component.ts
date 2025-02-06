import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMsg = '';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  constructor() {
    effect(() => {
      this.errorMsg = this.authService.ErrorMsg();
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  loginUser(): void {
    console.log('clicked');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.loginForm.reset();
      },
      error: (error) => {
        // this.errorMsg = error.error;
      },
    });
  }
}
