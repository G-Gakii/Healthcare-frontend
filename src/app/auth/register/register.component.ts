import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  registerError = '';

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  constructor() {
    effect(() => {
      this.registerError = this.authService.ErrorMsg();
    });
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      role: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,30}$/)],
      ],
    });
  }

  registerUser = () => {
    console.log('clicked');

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.authService.registerUser(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res), this.registerForm.reset();
      },
      error: (error) => console.log('error', error),
    });
  };
}
