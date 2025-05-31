
import { Status } from "../enums/Status";

export class Booking {
  constructor(
    public id: number,
    public movieId: number,
    public showTime: Date,
    public seats: number[],
    public bookingDate: Date,
    public status: Status
  ) {}
}