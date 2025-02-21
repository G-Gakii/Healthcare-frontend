import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpinnerComponent } from '../../spin/spinner/spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  registerError = '';
  isLoading = false;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    effect(() => {
      this.registerError = this.authService.ErrorMsg();
      this.isLoading = this.authService.isLoading();
    });
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],

      password: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,30}$/)],
      ],
    });
  }

  registerUser(): void {
    this.authService.isLoading.set(true);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.authService.registerUser(this.registerForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
        console.log(res), this.registerForm.reset();
        this.authService.isLoading.set(false);
      },
      error: (error) => {
        console.log('error', error);
        this.authService.isLoading.set(false);
      },
    });
  }
}
