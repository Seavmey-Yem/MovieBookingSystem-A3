import { ShowTime } from "./ShowTime";
export class Cinema {
  constructor(
    public id: number,
    public name: string,
    public location: string,
    public showtimes: ShowTime[] = []
  ) {}
}