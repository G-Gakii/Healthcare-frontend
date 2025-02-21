import { Component, inject } from '@angular/core';
import { ProvidersService } from '../../service/providers.service';
import { Appointment } from '../../interface/appointment';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-your-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './your-appointments.component.html',
  styleUrl: './your-appointments.component.scss',
})
export class YourAppointmentsComponent {
  providerService = inject(ProvidersService);
  appointments: Appointment[] = [];
  router = inject(Router);

  constructor() {
    this.getAppointment();
  }

  getAppointment() {
    this.providerService.personalAppointments().subscribe({
      next: (res) => {
        console.log(res);
        this.appointments = res;
      },
      error: (err) => console.log(err),
    });
  }

  deleteAppointment(id: string) {
    console.log('delete');

    console.log(id);

    this.providerService.deleteAppointment(id).subscribe({
      next: (res) => {
        console.log(res),
          (this.appointments = this.appointments.filter(
            (appointment) => appointment._id !== id
          ));
      },
      error: (err) => console.log(err),
    });
  }
  EditAppointment(appointment: Appointment, id: string) {
    this.providerService.isEdit.set(true);
    this.providerService.providerId.set(id);
    if (this.providerService.appointmentForm) {
      const formattedDate = new Date(appointment.date)
        .toISOString()
        .slice(0, 16);
      this.providerService.appointmentForm.patchValue({
        date: formattedDate,
      });
      this.router.navigate(['/appointment']);
    } else {
      console.error('appointmentForm is not initialized');
    }
  }
}
