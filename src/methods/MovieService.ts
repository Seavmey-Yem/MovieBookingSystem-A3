import { Movie } from "../models/Movie";
import { ShowTime } from "../models/ShowTime";

export class MovieService {
  constructor(public movie: Movie[]) {}

  getMoviesByGenre(genre: string): Movie[] {
    return this.movie.filter(movie => movie.genre === genre);
  }

  getShowtimes(title: string): ShowTime[] {
    let movie = this.movie.find(m => m.title === title);
    return movie ? movie.showtime : [];
  }
}
