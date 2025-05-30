import { Booking } from "./Booking";

export class Payment{
    constructor(
        public id: number,
        public booking: Booking,
        // public paymenyMethod: paymentMethod[] = [],
        public amount : number,
        public tax: number,
        public bookingfee: number
    ){

    }
}