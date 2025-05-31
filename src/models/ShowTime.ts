import { Cinema } from "./Cinema";
import { Movie } from "./Movie";
import { Theater } from "./Theater";

export class ShowTime {
    constructor(
        public id : number,
        public movie : Movie,
        public cinema : Cinema,
        public theater : Theater,
        public startTime: Date,  
    ){}

}