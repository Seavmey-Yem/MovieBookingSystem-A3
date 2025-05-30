import { Booking } from "./Booking";

export class Ticket {
    constructor(
            public id: number,
            public booking: Booking,// Composition: a Ticket "has a" Booking
            public qrCode: string,
            public referenceNumber: string,
    )  {
        this.id = id;
        this.booking = booking;
        this.qrCode = qrCode;
        this.referenceNumber = referenceNumber;
    }

}
