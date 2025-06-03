import { AdminService } from '../methods/AdminService';
import { MovieService } from '../methods/MovieService';
import { Booking } from './Booking';
import { Movie } from './Movie';
import { Person } from './Person';
import { Receipt } from './Receipt';
import { Review } from './Review';

export class User extends Person {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public booking: Booking[] = []
  ) {
    super(id, name, email);
  }

  // Method to get the role of the user
  getRole(): string {
    return 'User';
  }

  // Method to verify credentials for login
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

  // Method to add a booking and print receipt and ticket
  addBooking(booking: Booking, receipt: Receipt): boolean {
    if (!booking || !booking.id || !booking.movieId || !booking.showTime) {
      console.log(`Booking failed for ${this.name}: Invalid booking details.`);
      return false;
    }

    this.booking.push(booking);
    receipt.printReceipt();
    receipt.ticket.printTicket();
    return true;
  }

  // Method to process a payment for the user
  makePayment(amount: number, method: string): boolean {
    if (amount <= 0 || !method) {
      console.log(`Payment failed for ${this.name}: Invalid amount or payment method.`);
      return false;
    }
    console.log(`Payment succeeded for ${this.name}: $${amount} via ${method}`);
    return true;
  }

  // Method to display a list of movies using MovieService
  showMovies(movieService: MovieService): void {
    movieService.showListOfMovie();
  }

  // Method to display booked seats using AdminService
  showSeatBook(adnimService: AdminService): void {
    adnimService.showSeatBooked();
  }

  // Method to add a review for a movie
  addReview(movie: Movie, rating: number, comment: string): Review | null {
    // Basic validation
    if (!movie || rating < 0 || rating > 5 || !comment.trim()) {
      console.log("Invalid review data.");
      return null;
    }

    // Create new review
    const newReview = new Review(Date.now(), this, movie, rating, comment);

    // Add review to movie's reviews
    if (!movie.reviews) {
      movie.reviews = [];
    }
    movie.reviews.push(newReview);

    console.log(`Thank you ${this.name} for your rating "${movie.title}".`);
    return newReview;
  }
}
