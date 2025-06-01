import { Status } from "../enums/Status";
import { Zone } from "../enums/Zone";
import { Theater } from "./Theater";

export class Seat {
    constructor( 
        public id:number,
        public number:number, 
        public theater:Theater,
        public zone:Zone,
        public status:Status
    ){}
}