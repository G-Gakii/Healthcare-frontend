export interface AddProvider {
  name: string;
  email: string;
  location: Location;

  specialization: string[];
  consultation_fee: number;
  insurance: string[];
}
