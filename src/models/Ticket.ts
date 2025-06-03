import { Booking } from "./Booking";

export class Ticket {
  constructor(
    public ticketId: number,
    public referenceCode: string,
    public qrCode: string,
    public seatDetails: string[]
  ) {}


  /**
   * Prints the ticket details to the console.
   */
  printTicket(): void {
    console.log("🎟️ ----- Ticket Details ----- 🎟️");
    console.log(`Ticket ID       : ${this.ticketId}`);
    console.log(`Reference Code  : ${this.referenceCode}`);
    console.log(`QR Code         : ${this.qrCode}`);
    console.log(`Seats           : ${this.seatDetails.join(', ')}`);
    console.log("----------------------------------");
  }
}

