import { Genre } from './enums/Genre';
import { Status } from './enums/Status';
import { Zone } from './enums/Zone';

import { Movie } from './models/Movie';
import { Cinema } from './models/Cinema';
import { Theater } from './models/Theater';
import { Seat } from './models/Seat';
import { ShowTime } from './models/ShowTime';
import { Booking } from './models/Booking';
import { User } from './models/User';
import { PaymentMethod } from './models/PaymentMethod';

import { BookingService } from './methods/BookingService';
import { MovieService } from './methods/MovieService';
import { ShowTimeService } from './methods/ShowTimeService';


// Dummy cinema
const cinema = new Cinema(1, 'Downtown Cinema', '123 Main St');

// Create a theater
const theater = new Theater(1, 'Main Hall', [], [cinema]);

// Create seats and link them to the theater
const seat1 = new Seat(1, 1, theater, 'A', Status.AVAILABLE);
const seat2 = new Seat(2, 2, theater, 'A', Status.AVAILABLE);
const seat3 = new Seat(3, 3, theater, 'A', Status.RESERVED);
theater.seat.push(seat1, seat2, seat3);

// Create a movie
const movie = new Movie(1, 'Avengers: Endgame','PG-13',2025,5, []);

// Create a showtime
const showtime = new ShowTime(1,movie, cinema, theater, new Date('2025-06-01T18:00:00'));

// Create a user
const user = new User(1, 'John Doe', 'john@example.com', 'password123');

// Select available seats
const selectedSeats = [seat1, seat2];

// Create a booking
const booking = new Booking(
  1001,
  user,
  movie,
  showtime.startTime, 
  selectedSeats,
  new Date(),
  Status.RESERVED
);


// Create payment method
const paymentMethod = new PaymentMethod(1, 'Credit Card', 'Visa **** 1234');

// Use booking service
const bookingService = new BookingService();
const receipt = bookingService.completeBooking(booking, paymentMethod);

// Print receipt
receipt.printReceipt();