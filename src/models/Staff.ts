import { Role } from '../enums/Role';
import { Status } from '../enums/Status';
import { AdminService } from '../methods/AdminService';
import { MovieService } from '../methods/MovieService';
import { Booking } from './Booking';
import { Movie } from './Movie';
import { Person } from './Person';
import { User } from './User';

/**
 * Staff class represents a system staff member.
 * Extends Person and includes login validation, financial handling, and user/movie tools.
 */
export class Staff extends Person {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public department: Role
  ) {
    super(id, name, email);
  }

  /**
   * Returns the role of the person (Staff).
   */
  getRole(): string {
    return 'Staff';
  }

  /**
   * Validates login credentials based on email and role.
   */
  login(enteredEmail: string, role: Role): boolean {
    if (!enteredEmail) {
      console.log(`Login failed for ${this.name}: Missing email.`);
      return false;
    }
    if (!role) {
      console.log(`Login failed for ${this.name}: Missing role.`);
      return false;
    }

    if (this.email !== enteredEmail) {
      console.log(`Login failed for ${this.name}: Incorrect email.`);
      return false;
    }

    if (this.department !== role) {
      console.log(`Login failed for ${this.name}: Incorrect role.`);
      return false;
    }

    console.log(`Login succeeded for ${this.name} (Role: ${role})`);
    return true;
  }

  /**
   * Generates a mock QR code based on current time.
   */
  generateQRCode(): string {
    const qrCode = `QR-${this.id}-${Date.now()}`;
    console.log(`${this.name} generated QR code: ${qrCode}`);
    return qrCode;
  }

  /**
   * Collects money and validates the amount.
   */
  getMoney(amount: number): boolean {
    if (amount <= 0) {
      console.log(`Money collection failed for ${this.name}: Invalid amount.`);
      return false;
    }
    console.log(`${this.name} collected $${amount} in ${this.department} department.`);
    return true;
  }

  /**
   * Displays the list of movies using MovieService.
   */
  showMovies(movieService: MovieService): void {
    movieService.showListOfMovie();
  }

  /**
   * Displays information about booked seats using AdminService.
   */
  showSeatBook(adminService: AdminService): void {
    adminService.showSeatBooked();
  }

  /**
   * Displays the list of users using AdminService.
   */
  showUser(adminService: AdminService): void {
    adminService.showListOfUser();
  }

  /**
   * Displays each user's booking information.
   */
  checkUserBooking(users: User[]): void {
    if (users.length === 0) {
      console.log('No users found.');
      return;
    }

    users.forEach(user => {
      console.log(`\n📌 User: ${user.name} (${user.email})`);
      if (user.booking.length === 0) {
        console.log('  - No bookings.');
      } else {
        user.booking.forEach((booking, index) => {
          console.log(`  🔖 Booking #${index + 1}`);
          console.log(`    🎬 Movie: ${booking.movie.title}`);
          console.log(`    🕒 Showtime: ${booking.showTime.startTime}`);
          console.log(`    💺 Seats: ${booking.seats.map(s => `Zone-${s.zone} Seat-${s.number}`).join(', ')}`);
          console.log(`    📅 Date: ${booking.bookingDate}`);
          console.log(`    📄 Status: ${booking.status}`);
          if (booking.payment) {
            console.log(`    💳 Paid: $${booking.payment.amount} by ${booking.payment.paymentMethod.type}`);
          }
        });
      }
    });
  }

  /**
   * Displays all reviews for all movies.
   */
  showReview(movies: Movie[]): void {
    console.log("======= Movie Reviews =======");
    let reviewCount = 0;
    movies.forEach(movie => {
      if (movie.reviews && movie.reviews.length > 0) {
        console.log(`\nMovie: ${movie.title}`);
        movie.reviews.forEach(review => {
          review.printReview();
          reviewCount++;
        });
      }
    });

    if (reviewCount === 0) {
      console.log("No reviews available.");
    }
  }

  // Inside Staff.ts or the relevant class file
verifyTicket(qrCode: string, bookings: Booking[]): void {
  // Extract booking ID from the QR code string (e.g., "BOOKING-2")
  const bookingId = parseInt(qrCode.replace("BOOKING-", ""));

  // Find the booking
  const booking = bookings.find(b => b.id === bookingId);

  // Validate the booking
  if (booking && booking.status === Status.BOOKED) {
    console.log(`✅ Valid ticket for "${booking.movie.title}" at ${booking.showTime.startTime}`);
  } else {
    console.log("❌ Invalid or already used ticket.");
  }
}

}
