// src/methods/UserService.ts
import { Person } from '../models/Person';
import { Booking } from '../models/Booking';
import { Review } from '../models/Review';
import { Movie } from '../models/Movie';
import { ShowTime } from '../models/ShowTime';
import { User } from '../models/User';
import { Staff } from '../models/Saff';
import { Admin } from '../models/Admin';

export class UserService {
  private people: Person[] = [];

  register(name: string, email: string, password: string): User {
    const id = this.people.length + 1;
    const user = new User(id, name, email, password);
    this.people.push(user);
    console.log(`User registered: ID=${id}, Name=${name}, Email=${email}`);
    return user;
  }

  registerStaff(name: string, email: string, department: string): Staff {
    const id = this.people.length + 1;
    const staff = new Staff(id, name, email, department);
    this.people.push(staff);
    console.log(`Staff registered: ID=${id}, Name=${name}, Email=${email}, Department=${department}`);
    return staff;
  }

  registerAdmin(name: string, email: string, accessLevel: number): Admin {
    const id = this.people.length + 1;
    const admin = new Admin(id, name, email, accessLevel);
    this.people.push(admin);
    console.log(`Admin registered: ID=${id}, Name=${name}, Email=${email}, AccessLevel=${accessLevel}`);
    return admin;
  }

  login(email: string, password: string): Person | null {
    const person = this.people.find(p => p.email === email && (p instanceof User && (p as User).password === password));
    if (person) {
      console.log(`Login successful: Email=${email}, Role=${person.getRole()}`);
    } else {
      console.log(`Login failed: Email=${email}`);
    }
    return person || null;
  }

  getPersonById(id: number): Person | null {
    const person = this.people.find(p => p.id === id) || null;
    if (person) {
      console.log(`Person found: ID=${id}, Name=${person.name}, Role=${person.getRole()}`);
    } else {
      console.log(`Person not found: ID=${id}`);
    }
    return person;
  }

  updatePerson(id: number, name: string, email: string): boolean {
    const person = this.getPersonById(id);
    if (person) {
      const oldName = person.name;
      const oldEmail = person.email;
      person.name = name;
      person.email = email;
      console.log(`Person updated: ID=${id}, OldName=${oldName}, NewName=${name}, OldEmail=${oldEmail}, NewEmail=${email}`);
      return true;
    }
    console.log(`Person update failed: ID=${id} not found`);
    return false;
  }

  deletePerson(id: number): boolean {
    const index = this.people.findIndex(p => p.id === id);
    if (index !== -1) {
      const person = this.people[index];
      this.people.splice(index, 1);
      console.log(`Person deleted: ID=${id}, Name=${person.name}, Role=${person.getRole()}`);
      return true;
    }
    console.log(`Person deletion failed: ID=${id} not found`);
    return false;
  }

  getUpcomingBookingsForUser(userId: number): Booking[] {
    const user = this.getPersonById(userId) as User;
    if (user && user instanceof User) {
      const now = new Date();
      const upcomingBookings = user.booking.filter(booking => booking.showTime > now);
      console.log(`Fetched upcoming bookings for User ID=${userId}: ${upcomingBookings.length} bookings found`);
      return upcomingBookings;
    }
    console.log(`No upcoming bookings found for User ID=${userId}: Not a User`);
    return [];
  }

  getPastBookingsForUser(userId: number): Booking[] {
    const user = this.getPersonById(userId) as User;
    if (user && user instanceof User) {
      const now = new Date();
      const pastBookings = user.booking.filter(booking => booking.showTime <= now);
      console.log(`Fetched past bookings for User ID=${userId}: ${pastBookings.length} bookings found`);
      return pastBookings;
    }
    console.log(`No past bookings found for User ID=${userId}: Not a User`);
    return [];
  }

  addBookingForUser(userId: number, booking: Booking): boolean {
    const user = this.getPersonById(userId) as User;
    if (user && user instanceof User) {
      user.booking.push(booking);
      console.log(`Booking added for User ID=${userId}: Booking ID=${booking.id}, Movie ID=${booking.movieId}`);
      return true;
    }
    console.log(`Failed to add booking for User ID=${userId}: Not a User`);
    return false;
  }

  addReviewForUser(userId: number, movieId: number, rating: number, comment: string): Review | null {
    const person = this.getPersonById(userId);
    if (person && person instanceof User) {
      const movie = new Movie(
        movieId,
        "Unknown Title",
        "Unknown Genre",
        120,
        0.0,
        []
      );
      try {
        const review = new Review(Date.now(), person, movie, rating, comment);
        console.log(`Review added for User ID=${userId}: Movie ID=${movieId}, Rating=${rating}, Comment="${comment}"`);
        return review;
      } catch (error) {
        console.error(`Error creating review for User ID=${userId}:`, error);
        return null;
      }
    }
    console.log(`Failed to add review for User ID=${userId}: Not a User`);
    return null;
  }
}