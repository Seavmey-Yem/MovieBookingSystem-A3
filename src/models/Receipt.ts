import { Booking } from './Booking';
import { Payment } from './Payment';
import { Ticket } from './Ticket';


/**
 * Represents a Receipt for a movie booking.
 * Includes booking, payment, ticket, and optional feedback (rating and comment).
 */
export class Receipt {
  constructor(
    public receiptId: number,
    public booking: Booking,
    public payment: Payment,
    public ticket: Ticket,
    public rating?: number,
    public comment?: string
  ) {}

  
  /**
   * Prints a formatted booking receipt.
   */
  printReceipt(): void {
    console.log("----- Booking Receipt -----");
    console.log(`Booking ID: ${this.booking.id}`);
    console.log(`Customer: ${this.booking.user?.name} (${this.booking.user?.email})`);

    const movie = this.booking.movie;
    if (movie) {
      console.log(`Movie: ${movie.title}`);
      console.log(`Duration: ${movie.duration} minutes`);
    } else {
      console.log("Movie: Unknown");
    }

    console.log(`Seats: ${this.ticket.seatDetails.join(', ')}`);
    console.log(`Amount Paid: $${this.payment.amount}`);
    console.log(`Payment Method: ${this.payment.paymentMethod.type}`);
    if (this.rating !== undefined) console.log(`User Rating: ${this.rating}`);
    if (this.comment) console.log(`Comment: ${this.comment}`);
    console.log("----------------------------");
  }
}
