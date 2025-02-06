import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HeroComponent } from '../hero/hero.component';
import { PartnersComponent } from '../partners/partners.component';
import { FeaturesComponent } from '../features/features.component';
import { StagesComponent } from '../stages/stages.component';
import { ProvidersComponent } from '../../healthcare/providers/providers.component';
import { ProvidersListComponent } from '../../healthcare/providers-list/providers-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    PartnersComponent,
    FeaturesComponent,
    StagesComponent,
    ProvidersComponent,
    ProvidersListComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
