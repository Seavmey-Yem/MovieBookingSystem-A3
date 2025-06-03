import { Role } from '../enums/Role';
import { AdminService } from '../methods/AdminService';
import { MovieService } from '../methods/MovieService';
import { Movie } from './Movie';
import { Person } from './Person';
import { User } from './User';

/**
 * Admin class extends Person and adds administrative capabilities.
 * Includes login validation, movie management, user activity review, and data reporting.
 */
export class Admin extends Person {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public department: Role,
    public accessLevel: number
  ) {
    super(id, name, email);
  }

  /**
   * Returns the role of the person (Admin).
   */
  getRole(): string {
    return 'Admin';
  }

  /**
   * Validates login credentials based on email and department (role).
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
   * Adds a movie to the provided movie list.
   */
  addMovie(movieList: Movie[], movie: Movie): void {
    movieList.push(movie);
    console.log(`🎬 Movie "${movie.title}" successfully added`);
  }

  /**
   * Displays the list of movies using the MovieService.
   */
  showMovies(movieService: MovieService): void {
    movieService.showListOfMovie();
  }

  /**
   * Displays booking information for each user.
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
   * Displays the list of staff using AdminService.
   */
  showStaff(adminService: AdminService): void {
    adminService.showListOfSaff();
  }

  /**
   * Displays the list of users using AdminService.
   */
  showUser(adminService: AdminService): void {
    adminService.showListOfUser();
  }

  /**
   * Displays counts of Admins, Staff, and Users using AdminService.
   */
  showCountPerson(adminService: AdminService): void {
    adminService.displayCounts();
  }

  /**
   * Displays booked seat information using AdminService.
   */
  showSeatBook(adminService: AdminService): void {
    adminService.showSeatBooked();
  }

  /**
   * Displays all movie reviews from the list of movies.
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
}
