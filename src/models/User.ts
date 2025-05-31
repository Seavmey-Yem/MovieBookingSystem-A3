import { Booking } from './Booking';
import { Person } from './Person';

export class User extends Person {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public booking: Booking[] = [] // Initialize as empty array
  ) {
    super(id, name, email);
  }

  getRole(): string {
    return 'User';
  }

  // Login method to verify credentials
  login(enteredEmail: string, enteredPassword: string): boolean {
    if (!enteredEmail || !enteredPassword) {
      console.log(`Login failed for ${this.name}: Missing email or password.`);
      return false;
    }
    const isValid = this.email === enteredEmail && this.password === enteredPassword;
    if (isValid) {
      console.log(`Login succeeded for ${this.name} (Role: User)`);
    } else {
      console.log(`Login failed for ${this.name}: Incorrect email or password.`);
    }
    return isValid;
  }

  // Method to add a booking
  addBooking(booking: Booking): boolean {
    if (!booking || !booking.id || !booking.movieId || !booking.showTime) {
      console.log(`Booking failed for ${this.name}: Invalid booking details.`);
      return false;
    }
    this.booking.push(booking);
    console.log(`Booking succeeded for ${this.name}: Movie ID ${booking.movieId} at ${booking.showTime}`);
    return true;
  }

  // Method to add a review
  addReview(movieId: number, rating: number, comment: string): boolean {
    if (!movieId || rating < 0 || rating > 5 || !comment) {
      console.log(`Review failed for ${this.name}: Invalid rating (0-5) or missing comment.`);
      return false;
    }
    console.log(`Review succeeded for ${this.name}: Movie ID ${movieId}, Rating ${rating}, Comment "${comment}"`);
    return true;
  }

  // Method to process a payment
  makePayment(amount: number, method: string): boolean {
    if (amount <= 0 || !method) {
      console.log(`Payment failed for ${this.name}: Invalid amount or payment method.`);
      return false;
    }
    console.log(`Payment succeeded for ${this.name}: $${amount} via ${method}`);
    return true;
  }
}