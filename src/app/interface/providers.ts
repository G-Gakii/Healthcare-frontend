export interface Location {
  type: string;
  coordinates: number[];
}
interface Review {
  _id: string;
  provider: string;
  user: string;
  rating: number;
  comment: string;
}

export interface Providers {
  location: Location;
  _id: string;
  name: string;
  specialization: string[];
  consultation_fee: number;
  insurance: string[];
  rating: number;
  rate: number;
  id: string;
  email: string;
  reviews: Review[];
}
export interface providersResponse {
  providers: Providers[];
}
