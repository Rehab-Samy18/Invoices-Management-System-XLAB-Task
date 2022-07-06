import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from 'src/app/shared/invoice';
import { InvoiceService } from 'src/app/shared/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  newInvoice:Invoice = new Invoice();
  invoices:Invoice[]=[];
  sub:Subscription|null=null;
  sub2:Subscription|null=null;
  myInvDetails:any[]=[]

  constructor(public invSer:InvoiceService,public router:Router,public ac:ActivatedRoute) { }

  ngOnInit(): void {
    this.getGrandTotal();
    this.getTotalQuantity();
    
    this.sub = this.ac.params.subscribe(a=>{
      this.sub2 = this.invSer.getInvoiceByID(a['id']).subscribe(d=>{
         this.invSer.formData3=d.invoice
         this.invSer.invoiceItems=d.invoiceDetails
         console.log(d);
       })
    })
  }

  //Calculate Invoice Total Price
  getGrandTotal()
  {
    this.invSer.formData3.invoiceTotalPrice = this.invSer.invoiceItems.reduce((prev,curr)=>{
      return (prev + curr.itemTotalPrice);
    },0)
  }

  //Calculate Invoice Quantity
  getTotalQuantity()
  {
    this.invSer.formData3.invoiceTotalQuantity = this.invSer.invoiceItems.reduce((prev,curr)=>{
      return (+(prev) + +(curr.quantity));
    },0)
  }

  //Create Invoice 
  onSubmit(){
    this.invSer.createInvoice().subscribe(res => {
      console.log(res);
      this.router.navigate(['/invoices'])
    })
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.sub2?.unsubscribe();
  }
}
