import { ShowTime } from './ShowTime';
import { Seat } from './Seat';
import { User } from './User';
import { Payment } from './Payment';
import { Ticket } from './Ticket';
import { Movie } from './Movie';
import { Status } from '../enums/Status';
export class Booking {
  constructor(
    public id: number,
    public movieId: number,
    public user: User,
    public movie: Movie,
    public showTime: ShowTime,
    public seats: Seat[], 
    public bookingDate: Date,
    public status: Status,
    public payment?: Payment,
    public ticket?: Ticket
  ) {}
}

