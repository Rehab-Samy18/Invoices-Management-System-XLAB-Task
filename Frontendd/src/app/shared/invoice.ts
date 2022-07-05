import { InvoiceItem } from "./invoice-item";

export class Invoice {
    constructor(
        public invoiceID:number=Number(),
        public customerName:string='',
        public invoiceDate:Date=new Date(),
        public invoiceTotalPrice:number=Number(),
        public invoiceTotalQuantity:number=Number(),
        public invoice_Details:InvoiceItem=new InvoiceItem(),
       )
{}
}
