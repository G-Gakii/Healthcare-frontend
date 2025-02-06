import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stages',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './stages.component.html',
  styleUrl: './stages.component.scss',
})
export class StagesComponent {}
