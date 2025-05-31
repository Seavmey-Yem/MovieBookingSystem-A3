
import { Person } from '../models/Person';
import { User } from '../models/User';

export class UserService {
  private people: Person[] = [];
  private readonly MAX_USERS = 5; // Maximum number of users

  // Register a User (for initial setup only, will be restricted)
  register(name: string, email: string, password: string): User | null {
    const userCount = this.people.filter(p => p.getRole() === 'User').length;
    if (userCount >= this.MAX_USERS || !name || !email || !password) {
      this.displayCounts(); // Show counts on failure without message
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

  // Display counts of users
  displayCounts(): void {
    const userCount = this.people.filter(p => p.getRole() === 'User').length;
    console.log(`Current User Count: Users=${userCount}`);
  }

  // Login method for users
  login(email: string, password: string): Person | null {
    const person = this.people.find(p => p.email === email && p instanceof User && (p as User).password === password);
    if (person) {
      console.log(`Login succeeded for: ${person.name} (Role: ${person.getRole()})`);
      return person;
    } else {
      console.log(`Login failed: No user found with email ${email} or incorrect credentials.`);
      return null;
    }
  }
}