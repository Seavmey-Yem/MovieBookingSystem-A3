import { Movie } from "../models/Movie";
import { ShowTime } from "../models/ShowTime";

export class MovieService {
  constructor(public movies: Movie[]) {}

  getMoviesByGenre(genre: string): Movie[] {
    return this.movies.filter(movie => movie.genre === genre);
  }

  getShowtimes(title: string): ShowTime[] {
    const movie = this.movies.find(m => m.title === title);
    return movie ? movie.showtime : [];
  }

  showListOfMovie(): void {
    if (this.movies.length === 0) {
      console.log("❌ No movies available.");
      return;
    }

    console.log("🎞️ List of Movies:");
    this.movies.forEach((movie, index) => {
      console.log(`-----------------------------`);
      console.log(`#${index + 1}`);
      console.log(`Title: ${movie.title}`);
      console.log(`Genre: ${movie.genre}`);
      console.log(`Duration: ${movie.duration} minutes`);
      if (movie.showtime && movie.showtime.length > 0) {
        console.log(`Showtimes:`);
        movie.showtime.forEach((s, i) => {
          console.log(`  ${i + 1}. ${s.startTime.toLocaleString()} at ${s.cinema}, ${s.theater}`);
        });
      } else {
        console.log("Showtimes: Not scheduled");
      }
    });
    console.log("-----------------------------");
  }
}

