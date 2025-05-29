import { Cinema } from "./Cinema";
import { Seat } from "./Seat";

export class Theater{
    constructor(
        public id:number,
        public name:string,
        public seat:Seat[],
        public cinema:Cinema[]
    ){}
}