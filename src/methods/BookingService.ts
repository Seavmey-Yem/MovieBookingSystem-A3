import { Seat } from '../models/Seat';
import { ShowTime } from '../models/ShowTime';
import { Booking } from '../models/Booking';
import { Ticket } from '../models/Ticket';
import { Payment } from '../models/Payment';
import { PaymentStatus } from '../enums/PaymentStatus';
import { Status } from '../enums/Status';
import { PaymentMethod } from '../models/PaymentMethod';
import { Receipt } from '../models/Receipt';

/**
 * Service class for managing bookings, payments, and tickets.
 */
export class BookingService {
  /**
   * Returns all available seats for a given showtime.
   * @param showtime - The ShowTime object containing seats and theater info.
   * @returns An array of available Seat objects.
   */
  getAvailableSeats(showtime: ShowTime): Seat[] {
    return showtime.theater.seat.filter(seat => seat.status === Status.AVAILABLE);
  }

  /**
   * Marks the given seats as reserved.
   * @param seats - An array of Seat objects to reserve.
   */
  reserveSeats(seats: Seat[]): void {
    seats.forEach(seat => (seat.status = Status.RESERVED));
  }

  /**
   * Calculates the base total price for a booking.
   * @param booking - The Booking object containing selected seats.
   * @returns The total price before tax and fees.
   */
  calculateTotal(booking: Booking): number {
    return booking.seats.length * 12;
  }

  /**
   * Generates a ticket for a given booking.
   * @param booking - The Booking object.
   * @returns A new Ticket object with relevant details.
   */
  generateTicket(booking: Booking): Ticket {
    const seatDetails = booking.seats.map(seat => `Zone-${seat.zone} Seat-${seat.number}`);
    return new Ticket(Date.now(), `REF-${booking.id}`, `QR-${booking.id}`, seatDetails);
  }

  /**
   * Creates a payment object for the given booking and payment method.
   * @param booking - The Booking object to pay for.
   * @param method - The PaymentMethod selected by the customer.
   * @returns A new Payment object including tax and booking fee.
   */
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

  /**
   * Completes the entire booking process: reserves seats, makes payment, and generates a ticket.
   * @param booking - The Booking object to complete.
   * @param paymentMethod - The PaymentMethod selected by the customer.
   * @returns A new Receipt object summarizing the transaction.
   */
  completeBooking(booking: Booking, paymentMethod: PaymentMethod): Receipt {
    this.reserveSeats(booking.seats);
    const payment = this.makePayment(booking, paymentMethod);
    booking.payment = payment;

    const ticket = this.generateTicket(booking);
    booking.ticket = ticket;

    return new Receipt(Date.now(), booking, payment, ticket);
  }
}
