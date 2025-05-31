
import { Person } from './Person';
import { Movie } from './Movie';

export class Review {
  constructor(
    public id: number,
    public user: Person, // Changed from User to Person
    public movie: Movie,
    public rating: number,
    public comment: string
  ) {}
}