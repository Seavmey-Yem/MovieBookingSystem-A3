import { Status } from "../enums/Status";
import { User } from "./User";

export class Booking {
    public id: number;
    public bookingDate: Date;
    public status: Status;
    public user: User;

    constructor(
        id: number,
        bookingDate: Date,
        status: Status,
        user: User
    ) {
        this.id = id;
        this.bookingDate = bookingDate;
        this.status = status;
        this.user = user;
    }
}
