import { Cinema } from "./Cinema";
import { Movie } from "./Movie";
import { Theater } from "./Theater";

// Represents a showtime for a movie at a specific cinema and theater.
export class ShowTime {
    constructor(
        public id : number,
        public movie : Movie,
        public cinema : Cinema,
        public theater : Theater,
        public startTime: Date,  
    ){}

}