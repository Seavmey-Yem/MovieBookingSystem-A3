import { Role } from '../enums/Role';
import { AdminService } from '../methods/AdminService';
import { MovieService } from '../methods/MovieService';
import { Movie } from './Movie';
import { Person } from './Person';
import { Review } from './Review';
import { User } from './User';

export class Staff extends Person {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public department: Role
  ) {
    super(id, name, email);
  }

  getRole(): string {
    return 'Staff';
  }

  // Login method to verify email
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

  // Method to generate a QR code (simulated)
  generateQRCode(): string {
    const qrCode = `QR-${this.id}-${Date.now()}`;
    console.log(`${this.name} generated QR code: ${qrCode}`);
    return qrCode;
  }

  // Method to collect money
  getMoney(amount: number): boolean {
    if (amount <= 0) {
      console.log(`Money collection failed for ${this.name}: Invalid amount.`);
      return false;
    }
    console.log(`${this.name} collected $${amount} in ${this.department} department.`);
    return true;
  }
  showMovies(movieService: MovieService): void {
      movieService.showListOfMovie();
  }
    showSeatBook(adnimService:AdminService): void {
        adnimService.showSeatBooked();
    }
      showUser(adnimService:AdminService): void {
      adnimService.showListOfUser();
  }
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
}