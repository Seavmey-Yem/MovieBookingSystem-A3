
import { Genre } from "../enums/Genre";
import { Review } from "./Review";
import { ShowTime } from "./ShowTime";

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