import { Role } from '../enums/Role';
import { Person } from '../models/Person';
import { Staff } from '../models/Staff';


/**
 * Service for managing staff and person-related operations.
 */
export class StaffService {
  private people: Person[] = [];
  private readonly MAX_STAFF = 3; // Maximum number of staff

  /**
   * Registers a new staff member.
   * Only allows registration if below MAX_STAFF and valid data is provided.
   * @param name - Name of the staff member
   * @param email - Email address of the staff member
   * @param department - Department/Role of the staff (must be from Role enum)
   * @returns Staff object if registration succeeds, otherwise null
   */
  registerStaff(name: string, email: string, department: Role): Staff | null {
    // Count current staff members
    const staffCount = this.people.filter(p => p.getRole() === 'Staff').length;

    // Check limits and validity
    if (staffCount >= this.MAX_STAFF || !name || !email || !department) {
      this.displayCounts(); // Show current staff count even on failure
      return null;
    } else {
      // Create new staff and assign a unique ID
      const id = this.people.length + 1;
      const staff = new Staff(id, name, email, department);
      this.people.push(staff); // Add to the people array

      // Log successful registration
      console.log(`Staff registered: ID=${id}, Name=${name}, Email=${email}, Department=${department} - Registration succeeded for Staff: ${name}`);
      this.displayCounts(); // Show updated staff count
      return staff;
    }
  }

    /**
   * Retrieves a person by their ID.
   * @param id - The unique ID of the person
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
   * Displays the current number of staff members registered.
   */
  displayCounts(): void {
    const staffCount = this.people.filter(p => p.getRole() === 'Staff').length;
    console.log(`Current Staff Count: Staff=${staffCount}`);
  }
}
