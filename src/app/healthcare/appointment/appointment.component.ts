import { Component, effect, inject } from '@angular/core';
import { ProvidersService } from '../../service/providers.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent {
  date!: Date;
  providerService = inject(ProvidersService);
  router = inject(Router);
  appointmentForm!: FormGroup;
  errMsg = '';
  isEdit = false;
  constructor() {
    this.appointmentForm = this.providerService.appointmentForm;
    effect(() => {
      this.isEdit = this.providerService.isEdit();
    });
  }

  bookAppointment() {
    let id = this.providerService.providerId();
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      this.providerService
        .EditAppointment(this.appointmentForm.value, id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/personalAppointment']);
          },
          error: (err) => {
            console.error(err), (this.errMsg = err);
          },
        });
    } else {
      this.providerService
        .bookAppointment(this.appointmentForm.value, id)
        .subscribe({
          next: (res) => {
            console.log(res), this.router.navigate(['/personalAppointment']);
          },
          error: (err) => {
            console.log(err), (this.errMsg = err);
          },
        });
    }
  }
}
