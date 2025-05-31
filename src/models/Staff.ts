import { MovieService } from '../methods/MovieService';
import { Person } from './Person';

export class Staff extends Person {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public department: string
  ) {
    super(id, name, email);
  }

  getRole(): string {
    return 'Staff';
  }

  // Login method to verify email
  login(enteredEmail: string): boolean {
    if (!enteredEmail) {
      console.log(`Login failed for ${this.name}: Missing email.`);
      return false;
    }
    const isValid = this.email === enteredEmail;
    if (isValid) {
      console.log(`Login succeeded for ${this.name} (Role: Staff)`);
    } else {
      console.log(`Login failed for ${this.name}: Incorrect email.`);
    }
    return isValid;
  }

  // Method to generate a QR code (simulated)
  generateQRCode(): string {
    const qrCode = `QR-${this.id}-${Date.now()}`;
    console.log(`${this.name} generated QR code: ${qrCode}`);
    return qrCode;
  }

  // Method to collect money
  getMoney(amount: number): boolean {
    if (amount <= 0) {
      console.log(`Money collection failed for ${this.name}: Invalid amount.`);
      return false;
    }
    console.log(`${this.name} collected $${amount} in ${this.department} department.`);
    return true;
  }
  showMovies(movieService: MovieService): void {
      movieService.showListOfMovie();
  }
}