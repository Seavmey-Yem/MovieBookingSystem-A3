import { Person } from './Person';

export class Admin extends Person {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public accessLevel: number
  ) {
    super(id, name, email);
  }

  getRole(): string {
    return 'Admin';
  }

  // Login method to verify email
  login(enteredEmail: string): boolean {
    if (!enteredEmail) {
      console.log(`Login failed for ${this.name}: Missing email.`);
      return false;
    }
    const isValid = this.email === enteredEmail;
    if (isValid) {
      console.log(`Login succeeded for ${this.name} (Role: Admin)`);
    } else {
      console.log(`Login failed for ${this.name}: Incorrect email.`);
    }
    return isValid;
  }
}