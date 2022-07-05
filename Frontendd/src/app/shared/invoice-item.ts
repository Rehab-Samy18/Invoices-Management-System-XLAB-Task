export class InvoiceItem {
    constructor(
        public invoiceID:number=Number(),
        public itemName:string='',
        public pricePerUnit:number=Number(),
        public quantity:number=Number(),
        public itemTotalPrice:number=Number()
       )
{}
}
