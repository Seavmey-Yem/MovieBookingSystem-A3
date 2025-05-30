import { Booking } from "./Booking";

export class Ticket {
    public id: number;
    public booking: Booking; // Composition: a Ticket "has a" Booking
    public qrCode: string;
    public referenceNumber: string;
}
