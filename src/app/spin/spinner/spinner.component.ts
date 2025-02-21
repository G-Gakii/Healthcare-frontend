import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  isLoading = false;
  authService = inject(AuthService);
  constructor() {
    effect(() => {
      this.isLoading = this.authService.isLoading();
    });
  }
}
