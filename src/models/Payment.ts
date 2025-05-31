import { Booking } from "./Booking";
import { PaymentMethod } from "./PaymentMethod";

export class Payment {
  constructor(
    public id: number,
    public booking: Booking,
    public paymentMethod: PaymentMethod,
    public amount: number,
    public tax: number,
    public bookingfee: number
  ) {}
}
