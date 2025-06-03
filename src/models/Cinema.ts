import { ShowTime } from "./ShowTime";

/**
 * Represents a Cinema with an ID, name, location, and a list of showtimes.
 */
export class Cinema {
  constructor(
    public id: number,
    public name: string,
    public location: string,
    public showtimes: ShowTime[] = []
  ) {}

  /**
   * Prints the basic info about the cinema and its showtimes.
   */
  displayInfo(): void {
    console.log(`🎥 Cinema: ${this.name}`);
    console.log(`📍 Location: ${this.location}`);
    if (this.showtimes.length > 0) {
      console.log(`🕒 Showtimes (${this.showtimes.length}):`);
      this.showtimes.forEach((show, index) => {
        console.log(`  ${index + 1}. ${show.movie?.title ?? 'Unknown Movie'} at ${show.startTime}`);
      });
    } else {
      console.log("No showtimes available.");
    }
  }
}
