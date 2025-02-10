import { Component, effect, inject } from '@angular/core';
import { ProvidersService } from '../../service/providers.service';
import { Providers, providersResponse } from '../../interface/providers';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-providers-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './providers-list.component.html',
  styleUrl: './providers-list.component.scss',
})
export class ProvidersListComponent {
  private providerService = inject(ProvidersService);
  private router = inject(Router);
  providers: Providers[] = [];
  constructor() {
    this.getProviders();
    effect(() => {
      this.providers = this.providerService.providersSignal();
    });
  }

  getProviders() {
    console.log('provide');

    this.providerService.getProviders().subscribe({
      next: (res: providersResponse) => {
        this.providerService.providersSignal.set(res.providers);
      },
    });
  }
  getproviderid(id: string) {
    this.providerService.providerId.set(id);

    this.router.navigate(['/provider/details']);
  }
}
