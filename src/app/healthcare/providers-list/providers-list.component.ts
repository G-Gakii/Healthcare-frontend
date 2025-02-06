import { Component, effect, inject } from '@angular/core';
import { ProvidersService } from '../../service/providers.service';
import { Providers, providersResponse } from '../../interface/providers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-providers-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './providers-list.component.html',
  styleUrl: './providers-list.component.scss',
})
export class ProvidersListComponent {
  private providerService = inject(ProvidersService);
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
}
