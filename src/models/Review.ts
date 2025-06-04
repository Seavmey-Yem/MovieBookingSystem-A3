import { Person } from './Person';
import { Movie } from './Movie';

// Represents a review for a movie written by a user.
export class Review {
  constructor(
    public id: number,
    public user: Person, 
    public movie: Movie,
    public rating: number,
    public comment: string
  ) {}

    // Prints the review details to the console.
  printReview(): void {
  console.log("----- Review Details -----");
  console.log(`Movie: ${this.movie.title}`);
  console.log(`Reviewer: ${this.user.name}`);
  console.log(`Rating: ${this.rating} / 5`);
  console.log(`Comment: "${this.comment}"`);
  console.log("---------------------------");
}

}