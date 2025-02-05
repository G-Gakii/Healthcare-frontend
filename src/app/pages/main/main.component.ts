import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HeroComponent } from '../hero/hero.component';
import { PartnersComponent } from '../partners/partners.component';
import { FeaturesComponent } from '../features/features.component';
import { StagesComponent } from '../stages/stages.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    PartnersComponent,
    FeaturesComponent,
    StagesComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
