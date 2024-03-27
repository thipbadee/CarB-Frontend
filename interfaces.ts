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
  pricePerDay: number;
  licensePlate: string;
  address: string;
  district: string;
  province: string;
  // postalCode: string;
  googleMapsURL: string;
  imageURL: string;
  tel: string;
}

export interface ParamDetail {
  params: {
    uid: string;
  }
}


export interface CarJson {
  success: boolean;
  count: number;
  data: Car[];
}

