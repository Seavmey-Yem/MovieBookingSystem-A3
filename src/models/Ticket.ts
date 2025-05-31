import { Booking } from "./Booking";

export class Ticket {
  constructor(
    public ticketId: number,
    public referenceCode: string,
    public qrCode: string,
    public seatDetails: string[]
  ) {}
}

