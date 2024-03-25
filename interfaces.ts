export interface ReservationItem {
  carId: string;
  carModel: string;
  numOfDays: number;
  pickupDate: string;
  pickupLocation: string;
  returnDate: string;
  returnLocation: string;
}

export interface Bookings {
  success: boolean;
  count: number;
  data: BookingsItem[];
}

export interface BookingsItem {
  _id: string;
  bookingDate: string;
  // user: string;
  car: string;
  createdAt: string;
  // __v: number;
}
