import { Person } from '../models/Person';
import { Admin } from '../models/Admin';

export class AdminService {
  private people: Person[] = [];
  private readonly MAX_ADMINS = 1; // Maximum number of admins

  // Register an Admin
  registerAdmin(name: string, email: string, accessLevel: number): Admin | null {
    const adminCount = this.people.filter(p => p.getRole() === 'Admin').length;
    if (adminCount >= this.MAX_ADMINS || !name || !email || accessLevel === undefined || accessLevel < 0) {
      this.displayCounts(); // Show counts on failure without message
      return null;
    } else {
      const id = this.people.length + 1;
      const admin = new Admin(id, name, email, accessLevel);
      this.people.push(admin);
      console.log(`Admin registered: ID=${id}, Name=${name}, Email=${email}, AccessLevel=${accessLevel} - Registration succeeded for Admin: ${name}`);
      this.displayCounts(); // Show counts after registration
      return admin;
    }
  }

  // Restrict new registrations to admins only
  registerNewPerson(name: string, email: string, accessLevel: number): Admin | null {
    const adminCount = this.people.filter(p => p.getRole() === 'Admin').length;
    if (adminCount >= this.MAX_ADMINS || !name || !email || accessLevel === undefined || accessLevel < 0) {
      this.displayCounts(); // Show counts on failure without message
      return null;
    } else {
      const id = this.people.length + 1;
      const admin = new Admin(id, name, email, accessLevel);
      this.people.push(admin);
      console.log(`New Admin registered: ID=${id}, Name=${name}, Email=${email}, AccessLevel=${accessLevel} - Registration succeeded for new Admin: ${name}`);
      this.displayCounts(); // Show counts after registration
      return admin;
    }
  }

  // Get person by ID
  getPersonById(id: number): Person | null {
    const person = this.people.find(p => p.id === id) || null;
    if (person) {
      console.log(`Person found: ID=${id}, Name=${person.name}, Role=${person.getRole()}`);
    } else {
      console.log(`Person not found: ID=${id}`);
    }
    return person;
  }

  // Display counts of admins
  displayCounts(): void {
    const adminCount = this.people.filter(p => p.getRole() === 'Admin').length;
    console.log(`Current Admin Count: Admins=${adminCount}`);
  }
}