import { Booking } from "./Booking";

export class Ticket {
 public id: number;
    public booking: Booking;
    public qrCode: string;
    public referenceNumber: string;

    constructor(
        id: number,
        booking: Booking,
        qrCode: string,
        referenceNumber: string
    ) {
        this.id = id;
        this.booking = booking;
        this.qrCode = qrCode;
        this.referenceNumber = referenceNumber;
    }

}
