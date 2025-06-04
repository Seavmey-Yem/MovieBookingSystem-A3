import { Cinema } from "./Cinema";
import { Seat } from "./Seat";

// Represents a theater (screen) in a cinema, containing seats and associated cinemas.
export class Theater{
    constructor(
        public id:number,
        public name:string,
        public seat:Seat[],
        public cinema:Cinema[]
    ){}
}