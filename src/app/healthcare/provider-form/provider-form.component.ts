import { Component, inject } from '@angular/core';
import { ProvidersService } from '../../service/providers.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-provider-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './provider-form.component.html',
  styleUrl: './provider-form.component.scss',
})
export class ProviderFormComponent {
  providerService = inject(ProvidersService);
  providerForm!: FormGroup;
  insurance!: FormArray;
  specialization!: FormArray;
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  constructor() {
    this.providerForm = this.providerService.providerForm;
    this.insurance = this.providerForm.get('insurance') as FormArray;
    this.specialization = this.providerForm.get('specialization') as FormArray;
  }

  addSpecilization() {
    this.specialization.push(this.fb.control(''));
  }
  addInsurance() {
    this.insurance.push(this.fb.control(''));
  }

  addProvider() {
    this.providerService.AddProviders(this.providerForm.value).subscribe({
      next: (res) => console.log(res),
    });
  }
}
