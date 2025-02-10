import { Component, inject, OnInit } from '@angular/core';
import { ProvidersService } from '../../service/providers.service';
import { Providers } from '../../interface/providers';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-providers-details',
  standalone: true,
  imports: [],
  templateUrl: './providers-details.component.html',
  styleUrl: './providers-details.component.scss',
})
export class ProvidersDetailsComponent {
  providerService = inject(ProvidersService);
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
}
