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
  car: Car|null;
  createdAt: string;
  // __v: number;
}

export interface CreateBooking {
  // _id: string;
  bookingDate: string;
  // user: string;
  car: string;
  createdAt: string;
  // __v: number;
}

export interface Car {
  _id: string;
  brand: string;
  carModel: string;
  type: string;
  licensePlate: string;
  googleMapsURL: string;
  tel: string;
  // "_id": "65fce2489bec4603fb757abf",
  //               "brand": "Toyota",
  //               "carModel": "altis",
  //               "type": "sedan",
  //               "licensePlate": "C6AZI",
  //               "googleMapsURL": "https://www.google.com/maps?q=-28.9542,-89.8348",
  //               "tel": "0528218057",
}

