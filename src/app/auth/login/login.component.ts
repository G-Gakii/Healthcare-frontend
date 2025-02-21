import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../spin/spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMsg = '';
  isLoading = false;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      this.errorMsg = this.authService.ErrorMsg();
      this.isLoading = this.authService.isLoading();
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  loginUser(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.isLoading.set(true);
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['']);
        this.authService.isLoading.set(false);

        this.loginForm.reset();
      },
      error: (error) => {
        this.authService.isLoading.set(false);
        // this.errorMsg = error.error;
      },
    });
  }
}
