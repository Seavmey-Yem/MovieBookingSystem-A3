import { Seat } from "../models/Seat";
import { ShowTime } from "../models/ShowTime";

export class ShowTimeService {
    getAvailableSeats(showtime: ShowTime): Seat[] {
        return ShowTime.Seat.filter((Seat: { Status: string; }) => Seat.Status);

    }

}