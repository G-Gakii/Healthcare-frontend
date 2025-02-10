import { Component, inject } from '@angular/core';
import { Geolocation } from '../../interface/geolocation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProvidersService } from '../../service/providers.service';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.scss',
})
export class ProvidersComponent {
  latitude!: number;
  longitude!: number;
  specilization = '';
  errorMsg = '';
  providerService = inject(ProvidersService);
  constructor() {
    this.geolocation();
  }
  geolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    } else {
      this.errorMsg = 'Geolocation is not supported by this browser.';
    }
  }
  showPosition(position: Geolocation) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  }

  searchProvider() {
    this.providerService
      .searchProvider(this.latitude, this.longitude, this.specilization)
      .subscribe({
        next: (res) => {
          this.providerService.providersSignal.set(res);
        },
        error: (error) => console.log('geolocation', error),
      });
  }
}
