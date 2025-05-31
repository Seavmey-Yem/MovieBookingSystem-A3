// src/models/User.ts
import { Booking } from './Booking';
import { Person } from './Person';

export class User extends Person {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public booking: Booking[] = [] 
  ) {
    super(id, name, email);
  }

  getRole(): string {
    return 'User';
  }
}