import { Booking } from "./Booking";

export class Ticket {

    constructor(
    public id: number,
    public booking: Booking,
    public qrCode: string,
    public referenceNumber: string
    ) {

    }

}
