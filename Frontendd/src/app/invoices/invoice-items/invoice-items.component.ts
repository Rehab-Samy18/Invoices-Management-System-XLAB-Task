import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Invoice } from 'src/app/shared/invoice';
import { InvoiceItem } from 'src/app/shared/invoice-item';
import { InvoiceService } from 'src/app/shared/invoice.service';

@Component({
  selector: 'app-invoice-items',
  templateUrl: './invoice-items.component.html',
  styleUrls: ['./invoice-items.component.css']
})
export class InvoiceItemsComponent implements OnInit {
formData:InvoiceItem=new InvoiceItem();
formData2:Invoice=new Invoice();
invoiceItems:InvoiceItem[]=[];
  constructor(public invSer:InvoiceService) { }

  ngOnInit(): void {
    
  }
  onSubmit(){
      this.invSer.invoiceItems.push(this.formData);
  }
  updateTotal() {
    this.formData.itemTotalPrice = parseFloat((this.formData.quantity * this.formData.pricePerUnit).toFixed(2));
  }
}
