import { Movie } from "./Movie";
import { User } from "./User";

export class Review {
  constructor(
    public id: number,
    public user: User,
    public movie: Movie,
    public rating: number,
    public comment: string
  ) {}
}