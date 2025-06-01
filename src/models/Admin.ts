import { Role } from '../enums/Role';
import { AdminService } from '../methods/AdminService';
import { MovieService } from '../methods/MovieService';
import { Movie } from './Movie';
import { Person } from './Person';
import { Review } from './Review';
import { User } from './User';

export class Admin extends Person {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public department:Role,
    public accessLevel: number
  ) {
    super(id, name, email);
  }

  getRole(): string {
    return 'Admin';
  }

  // Login method to verify email
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

  addMovie(movieList: Movie[], movie: Movie): void {
    movieList.push(movie);
    console.log(`🎬 Movie "${movie.title}" successfuly`);
  }

  showMovies(movieService: MovieService): void {
    movieService.showListOfMovie();
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
  showSaff(adnimService:AdminService): void {
      adnimService.showListOfSaff();
  }
  showUser(adnimService:AdminService): void {
      adnimService.showListOfUser();
  }
  showCountPerson(adnimService:AdminService): void {
      adnimService.displayCounts();
  }
  showSeatBook(adnimService:AdminService): void {
      adnimService.showSeatBooked();
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
