// src/models/Admin.ts
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
}