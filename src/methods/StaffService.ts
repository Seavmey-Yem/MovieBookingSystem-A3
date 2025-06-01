import { Role } from '../enums/Role';
import { Person } from '../models/Person';
import { Staff } from '../models/Staff';

export class StaffService {
  private people: Person[] = [];
  private readonly MAX_STAFF = 3; // Maximum number of staff

  // Register a Staff (for initial setup only, will be restricted)
  registerStaff(name: string, email: string, department: Role): Staff | null {
    const staffCount = this.people.filter(p => p.getRole() === 'Staff').length;
    if (staffCount >= this.MAX_STAFF || !name || !email || !department) {
      this.displayCounts(); // Show counts on failure without message
      return null;
    } else {
      const id = this.people.length + 1;
      const staff = new Staff(id, name, email,department);
      this.people.push(staff);
      console.log(`Staff registered: ID=${id}, Name=${name}, Email=${email}, Department=${department} - Registration succeeded for Staff: ${name}`);
      this.displayCounts(); // Show counts after registration
      return staff;
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

  // Display counts of staff
  displayCounts(): void {
    const staffCount = this.people.filter(p => p.getRole() === 'Staff').length;
    console.log(`Current Staff Count: Staff=${staffCount}`);
  }
}
