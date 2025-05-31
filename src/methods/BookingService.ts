import { Seat } from '../models/Seat';
import { ShowTime } from '../models/ShowTime';
import { Booking } from '../models/Booking';
import { Ticket } from '../models/Ticket';
import { Payment } from '../models/Payment';
import { PaymentStatus } from '../enums/PaymentStatus';
import { Status } from '../enums/Status';
import { PaymentMethod } from '../models/PaymentMethod';
import { Receipt } from '../models/Receipt';

export class BookingService {
  getAvailableSeats(showtime: ShowTime): Seat[] {
    return showtime.theater.seat.filter(seat => seat.status === Status.AVAILABLE);
  }

  reserveSeats(seats: Seat[]): void {
    seats.forEach(seat => (seat.status = Status.RESERVED));
  }

  calculateTotal(booking: Booking): number {
    return booking.seats.length * 12; 
  }

generateTicket(booking: Booking): Ticket {
  const seatDetails = booking.seats.map(seat => `Zone-${seat.zone} Seat-${seat.number}`);
  return new Ticket(Date.now(), `REF-${booking.id}`, `QR-${booking.id}`, seatDetails);
}


makePayment(booking: Booking, method: PaymentMethod): Payment {
    const baseTotal = this.calculateTotal(booking);
    const tax = baseTotal * 0.1;
    const bookingFee = 2;
    const total = baseTotal + tax + bookingFee;

    return new Payment(
      Date.now(),
      booking,
      method,
      total,
      tax,
      bookingFee
    );
  }

  completeBooking(booking: Booking, paymentMethod: PaymentMethod): Receipt {
    this.reserveSeats(booking.seats);
    const payment = this.makePayment(booking, paymentMethod);
    booking.payment = payment;

    const ticket = this.generateTicket(booking);
    booking.ticket = ticket;

    return new Receipt(Date.now(), booking, payment, ticket);
  }
}
