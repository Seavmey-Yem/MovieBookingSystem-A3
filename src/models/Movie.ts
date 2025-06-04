
import { Genre } from "../enums/Genre";
import { Review } from "./Review";
import { ShowTime } from "./ShowTime";

// Represents a movie with its details, showtimes, and reviews.
export class Movie {
  constructor(
    public id: number,
    public title: string,
    public genre: Genre,
    public duration: number,
    public showtime: ShowTime[],
    public reviews: Review[] = []
  ) {}
}