// Define abstract class Person
export abstract class Person {
  constructor(
    public id: number, 
    public name: string, 
    public email: string 
  ) {}

  abstract getRole(): string; // Abstract method that must be implemented by subclasses
}
