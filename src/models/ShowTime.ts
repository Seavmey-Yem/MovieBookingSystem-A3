import { Cinema } from "./Cinema";
import { Theater } from "./Theater";

export class ShowTime {
    static Seat: any;
    constructor(
        public id : number,
        // public movie : Movie
        public cinema : Cinema,
        public theater : Theater,
        public startTime: Date,  
    ){}

}