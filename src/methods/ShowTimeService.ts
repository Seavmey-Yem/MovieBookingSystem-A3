import { Seat } from "../models/Seat";
import { ShowTime } from "../models/ShowTime";
import { Status } from "../enums/Status";
import { Movie } from "../models/Movie";

export class ShowTimeService {
  getAvailableSeats(showtime: ShowTime): Seat[] {
    return showtime.theater.seat.filter(seat => seat.status === Status.AVAILABLE);
  }
}
