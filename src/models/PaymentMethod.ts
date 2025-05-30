export class PaymentMethod {
    public id: number;
    public type: string;
    public detail: string;

    constructor(id: number, type: string , detail: string ) {
        this.id = id;
        this.type = type;
        this.detail = detail;
    }
}
