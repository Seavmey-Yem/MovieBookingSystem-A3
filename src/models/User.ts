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


  // Method to process a payment
  makePayment(amount: number, method: string): boolean {
    if (amount <= 0 || !method) {
      console.log(`Payment failed for ${this.name}: Invalid amount or payment method.`);
      return false;
    }
    console.log(`Payment succeeded for ${this.name}: $${amount} via ${method}`);
    return true;
  }
      showMovies(movieService: MovieService): void {
      movieService.showListOfMovie();
    }

      showSeatBook(adnimService:AdminService): void {
          adnimService.showSeatBooked();
      }
      addReview(movie: Movie, rating: number, comment: string): Review | null {
  // Basic validation
  if (!movie || rating < 0 || rating > 5 || !comment.trim()) {
    console.log("Invalid review data.");
    return null;
  }

  // Create new review
  const newReview = new Review(Date.now(), this, movie, rating, comment);

  // Add to movie's review list
  if (!movie.reviews) {
    movie.reviews = [];
  }
  movie.reviews.push(newReview);

  console.log(`Thank you ${this.name} for your rating "${movie.title}".`);
  return newReview;
}

      
}


