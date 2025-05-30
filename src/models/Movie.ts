import { ShowTime } from "./ShowTime";

export class Movie{
    constructor(
        public id : number,
        public title: string,
        public genre: string,
        public duration: number, 
        public rating: number,
        public showtime : ShowTime[]
    ){}
}