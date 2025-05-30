import { Status } from "../enums/Status";
import { User } from "./User";

export class Booking {
    constructor(
    public id: number,
    public bookingDate: Date,
    public status: Status,
    public user: User
    ) {}
}
