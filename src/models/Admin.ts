import { MovieService } from '../methods/MovieService';
import { Movie } from './Movie';
import { Person } from './Person';
import { User } from './User';

export class Admin extends Person {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public accessLevel: number
  ) {
    super(id, name, email);
  }

  getRole(): string {
    return 'Admin';
  }

  // Login method to verify email
  login(enteredEmail: string): boolean {
    if (!enteredEmail) {
      console.log(`Login failed for ${this.name}: Missing email.`);
      return false;
    }
    const isValid = this.email === enteredEmail;
    if (isValid) {
      console.log(`Login succeeded for ${this.name} (Role: Admin)`);
    } else {
      console.log(`Login failed for ${this.name}: Incorrect email.`);
    }
    return isValid;
  }

  addMovie(movieList: Movie[], movie: Movie): void {
    movieList.push(movie);
    console.log(`🎬 Movie "${movie.title}" added by admin.`);
  }
    showMovies(movieService: MovieService): void {
    movieService.showListOfMovie();
  }

  showAllUserBookings(users: User[]): void {
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
          console.log(`    💳 Paid: $${booking.payment.amount} via ${booking.payment.paymentMethod.type}`);
        }
      });
    }
  });
}
}
