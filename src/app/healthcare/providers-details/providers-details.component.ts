import { Component, inject, OnInit } from '@angular/core';
import { ProvidersService } from '../../service/providers.service';
import { Providers } from '../../interface/providers';
import { ResourceLoader } from '@angular/compiler';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-providers-details',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './providers-details.component.html',
  styleUrl: './providers-details.component.scss',
})
export class ProvidersDetailsComponent {
  faStar = faStar;
  providerService = inject(ProvidersService);
  router = inject(Router);
  provider: Providers = {
    location: { type: '', coordinates: [] },
    _id: '',
    name: '',
    specialization: [],
    consultation_fee: 0,
    insurance: [],
    rating: 0,
    rate: 0,
    id: '',
    email: '',
    reviews: [
      {
        _id: '',
        provider: ';',
        user: '',
        rating: 0,
        comment: '',
      },
    ],
  };

  constructor() {
    this.getProvider();
  }

  getProvider() {
    this.providerService
      .getProvider(this.providerService.providerId())
      .subscribe({
        next: (res) => {
          console.log(res), (this.provider = res);
        },
      });
  }
  bookAppointment(id: string) {
    this.providerService.providerId.set(id);
    this.router.navigate(['/appointment']);
  }
  reviewProvider(id: string) {
    this.providerService.providerId.set(id);
    this.router.navigate(['/review']);
  }
}
