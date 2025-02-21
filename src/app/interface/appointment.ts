interface provider {
  name: string;
}

export interface Appointment {
  _id: string;
  date: Date;

  provider: provider;
}
