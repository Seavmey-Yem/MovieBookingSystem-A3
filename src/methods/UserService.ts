import { Person } from '../models/Person';
import { User } from '../models/User';

/**
 * Service class for managing user registrations and data retrieval.
 */
export class UserService {
  private people: Person[] = [];
  private readonly MAX_USERS = 100; // Maximum number of users

  /**
   * Registers a new user if under the maximum limit and input data is valid.
   * @param name - The user's name.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns The created User object or null if registration fails.
   */
  register(name: string, email: string, password: string): User | null {
    const userCount = this.people.filter(p => p.getRole() === 'User').length;
    if (userCount >= this.MAX_USERS || !name || !email || !password) {
      this.displayCounts(); // Show counts on failure
      return null;
    } else {
      const id = this.people.length + 1;
      const user = new User(id, name, email, password);
      this.people.push(user);
      console.log(`User registered: ID=${id}, Name=${name}, Email=${email} - Registration succeeded for User: ${name}`);
      this.displayCounts(); // Show counts after registration
      return user;
    }
  }

  /**
   * Retrieves a person (user or other) by their ID.
   * @param id - The unique ID of the person.
   * @returns The Person object or null if not found.
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
   * Displays the current count of registered users.
   */
  displayCounts(): void {
    const userCount = this.people.filter(p => p.getRole() === 'User').length;
    console.log(`Current User Count: Users=${userCount}`);
  }
}
