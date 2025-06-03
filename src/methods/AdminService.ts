import { Person } from '../models/Person';
import { Admin } from '../models/Admin';
import { Seat } from '../models/Seat';
import { Role } from '../enums/Role';

/**
 * Service class responsible for handling Admin-related operations,
 * including registration, listing, and reporting.
 */
export class AdminService {
  private people: Person[] = []; // List of all registered people (Admins, Staff, Users)
  private readonly MAX_ADMINS = 1; // Limit to only one admin
  private seats: Seat[] = []; // List of all seats

  /**
   * Registers an admin with the provided details.
   * Validates limit and input before registration.
   * @param name - Admin's name
   * @param email - Admin's email
   * @param department - Admin's department/role
   * @param accessLevel - Admin's access level (must be non-negative)
   * @returns The Admin object if successful, otherwise null
   */
  registerAdmin(name: string, email: string, department: Role, accessLevel: number): Admin | null {
    const adminCount = this.people.filter(p => p.getRole() === 'Admin').length;

    if (adminCount >= this.MAX_ADMINS || !name || !email || accessLevel === undefined || accessLevel < 0) {
      this.displayCounts(); // Show counts even on failure
      return null;
    } else {
      const id = this.people.length + 1;
      const admin = new Admin(id, name, email, department, accessLevel);
      this.people.push(admin);
      console.log(`Admin registered: ID=${id}, Name=${name}, Email=${email}, AccessLevel=${accessLevel} - Registration succeeded for Admin: ${name}`);
      this.displayCounts();
      return admin;
    }
  }

  /**
   * Allows registering a new person as admin.
   * Uses the same logic as registerAdmin, intended to show controlled access.
   */
  registerNewPerson(name: string, email: string, department: Role, accessLevel: number): Admin | null {
    const adminCount = this.people.filter(p => p.getRole() === 'Admin').length;

    if (adminCount >= this.MAX_ADMINS || !name || !email || accessLevel === undefined || accessLevel < 0) {
      this.displayCounts();
      return null;
    } else {
      const id = this.people.length + 1;
      const admin = new Admin(id, name, email, department, accessLevel);
      this.people.push(admin);
      console.log(`New Admin registered: ID=${id}, Name=${name}, Email=${email}, AccessLevel=${accessLevel} - Registration succeeded for new Admin: ${name}`);
      this.displayCounts();
      return admin;
    }
  }

  /**
   * Retrieves a person by their ID.
   * @param id - The unique identifier for the person
   * @returns Person object if found, otherwise null
   */
  getPersonById(id: number): Person | null {
    const person = this.people.find(p => p.id === id) || null;
    if (person) {
      console.log(`Person found: ID=${id}, Name=${person.name}, Role=${person.getRole()}`);
    } else {
      console.log(`Person not found: ID=${id}`);
    }
    return person;
  }

  /**
   * Displays counts and names of all Admins, Staff, and Users.
   */
  displayCounts(): void {
    const adminList = this.people.filter(p => p.getRole() === 'Admin');
    const staffList = this.people.filter(p => p.getRole() === 'Staff');
    const userList = this.people.filter(p => p.getRole() === 'User');

    console.log(`\nQuantity Admin: ${adminList.length}`);
    if (adminList.length > 0) {
      const names = adminList.map(p => `Admin: ${p.name}`).join(', ');
      console.log(`Persons: (${names})`);
    }

    console.log(`\nQuantity Staff: ${staffList.length}`);
    if (staffList.length > 0) {
      const names = staffList.map(p => `Staff: ${p.name}`).join(', ');
      console.log(`Persons: (${names})`);
    }

    console.log(`\nQuantity User: ${userList.length}`);
    if (userList.length > 0) {
      const names = userList.map(p => `User: ${p.name}`).join(', ');
      console.log(`Persons: (${names})`);
    }
  }

  /**
   * Displays a list of all Users with their details.
   */
  showListOfUser(): void {
    const userList = this.people.filter(p => p.getRole() === 'User');
    console.log(`\nList of Users (${userList.length}):`);
    userList.forEach(user => {
      console.log(`- ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
    });
  }

  /**
   * Displays a list of all Staff members with their details.
   */
  showListOfSaff(): void {
    const staffList = this.people.filter(p => p.getRole() === 'Staff');
    console.log(`\nList of Staff (${staffList.length}):`);
    staffList.forEach(staff => {
      console.log(`- ID: ${staff.id}, Name: ${staff.name}, Email: ${staff.email}`);
    });
  }

  /**
   * Displays all seats that are currently marked as "booked".
   */
  showSeatBooked(): void {
    const bookedSeats = this.seats.filter(seat => seat.status.toLowerCase() === 'booked');
    console.log(`\nBooked Seats (${bookedSeats.length}):`);
    bookedSeats.forEach(seat => {
      console.log(`- Seat ID: ${seat.id}, Number: ${seat.number}, Zone: ${seat.zone}, Theater: ${seat.theater.name}`);
    });
  }
}
