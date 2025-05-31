// src/models/Person.ts
export abstract class Person {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}

  abstract getRole(): string; 
}