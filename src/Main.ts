import { Genre } from "./enums/Genre";
import { Role } from "./enums/Role";
import { Status } from "./enums/Status";
import { Zone } from "./enums/Zone";
import { AdminService } from "./methods/AdminService";
import { BookingService } from "./methods/BookingService";
import { Admin } from "./models/Admin";
import { Booking } from "./models/Booking";
import { Cinema } from "./models/Cinema";
import { Movie } from "./models/Movie";
import { Payment } from "./models/Payment";
import { PaymentMethod } from "./models/PaymentMethod";
import { Review } from "./models/Review";
import { Seat } from "./models/Seat";
import { ShowTime } from "./models/ShowTime";
import { Staff } from "./models/Staff";
import { Theater } from "./models/Theater";
import { User } from "./models/User";

// Movie list to hold all movies
let movieList: Movie[] = [];

// Admin 
let admin = new Admin(1, "Horth", "horth@gmail.com", Role.ADNIM ,1);

// Staff
let Saff1 = new Staff(1, "pheak", "pheak@gmail.com", Role.SAFF);

// User 
let user1 = new User(1, "Vannda", "Vannda@gmail.com", "12345");
user1.login("Vannda@gmail.com", "12345");

// Create Cinemas
let cinema1 = new Cinema(1, "Cinema One", "Downtown");
let cinema2 = new Cinema(2, "Cinema Two", "Uptown");

// Create Theaters
let theater1 = new Theater(1, "Theater 1", [], [cinema1]);
let theater2 = new Theater(2, "Theater 2", [], [cinema1]);
let theater3 = new Theater(3, "Theater 3", [], [cinema2]);

/**
 * User Story 1:
 * As a user, I want to browse and filter movies by genre and showtimes.
 */
// Create movies without showtimes first
let movie1 = new Movie(1, "Inception", Genre.ACTION, 148, []);
let movie2 = new Movie(2, "The Conjuring", Genre.HORROR, 112, []);

// Create showtimes
let showtime1 = new ShowTime(1, movie1, cinema1, theater1, new Date("2025-06-01T14:00:00"));
let showtime2 = new ShowTime(2, movie1, cinema1, theater2, new Date("2025-06-01T18:30:00"));
let showtime3 = new ShowTime(3, movie2, cinema1, theater3, new Date("2025-06-01T16:00:00"));
let showtime4 = new ShowTime(4, movie2, cinema1, theater1, new Date("2025-06-01T20:00:00"));

// Assign showtimes to movies
movie1.showtime.push(showtime1, showtime2);
movie2.showtime.push(showtime3, showtime4);

// Add showtimes to cinemas
cinema1.showtimes.push(showtime1, showtime2, showtime3, showtime4);

// Admin adds movies to the movieList
admin.addMovie(movieList, movie1);
admin.addMovie(movieList, movie2);

/**
 * User Story 2:
 * As a user, I want to view seat availability and choose my seats.
 */
// Create seats in theater
let seat1 = new Seat(1, 1, theater1, Zone.VIP, Status.AVAILABLE);
let seat2 = new Seat(2, 2, theater1, Zone.VIP, Status.AVAILABLE);
let seat3 = new Seat(3, 3, theater1, Zone.STANDARD, Status.AVAILABLE);

// Add seats to theater's seat list
theater1.seat.push(seat1, seat2, seat3);

/**
 * User Story 3:
 * As a user, I want to pay for my booking and receive a digital ticket.
 */
// Define some payment methods
let creditCard = new PaymentMethod(1, "Credit Card", "Visa **** 1234");
let mobilePay = new PaymentMethod(2, "Mobile Pay", "PayPal user@example.com");

// Create booking with selected seats and payment
let booking2 = new Booking(
  2,
  movie1.id,
  user1,
  movie1,
  showtime1,
  [seat1, seat2],
  new Date(),
  Status.BOOKED,
  new Payment(
    2,
    null as any, 
    mobilePay,
    25.00,
    1.50,
    0.50
  )
);

// Complete booking
let service = new AdminService();
let bookingService = new BookingService();
let receipt = bookingService.completeBooking(booking2, mobilePay);
user1.addBooking(booking2, receipt);

/**
 * User Story 4:
 * As a user, I want to view my upcoming and past bookings.
 */
user1.showSeatBook(service);
admin.checkUserBooking([user1]);


/**
 * User Story 5:
 * As a cinema staff member, I want to check the QR code for a valid ticket.
 */
// Simulate QR code with booking ID
let qrCode = "BOOKING-2";

// Let staff verify the QR code
Saff1.verifyTicket(qrCode, [booking2]);

/**
 * User Story 6:
 * As a user, I want to rate and review my movie experience after the show.
 */
user1.addReview(movie1, 4.5, "Amazing movie with a deep plot!");
Saff1.showReview(movieList);

