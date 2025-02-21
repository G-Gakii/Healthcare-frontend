import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ProvidersService } from '../../service/providers.service';
import { Review } from '../../interface/providers';
import { AddReview } from '../../interface/add-review';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss',
})
export class ReviewFormComponent {
  errorMessage: string | null = null;

  faStar = faStar;
  rating = 0;
  comment = '';

  providerService = inject(ProvidersService);
  setRating(value: number) {
    this.rating = value;
  }
  reviewProvider() {
    let id = this.providerService.providerId();
    const review: AddReview = {
      rating: this.rating,
      comment: this.comment,
    };
    console.log(this.rating);

    this.providerService.reviewProvider(id, review).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);

        this.errorMessage = err;
        console.log(this.errorMessage);
      },
    });
  }
}
