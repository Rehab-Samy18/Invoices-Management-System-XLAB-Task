import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from 'src/app/shared/invoice';
import { InvoiceService } from 'src/app/shared/invoice.service';

@Component({
  selector: 'app-invoicedetails',
  templateUrl: './invoicedetails.component.html',
  styleUrls: ['./invoicedetails.component.css']
})
export class InvoicedetailsComponent implements OnInit,OnDestroy {
  invoice:Invoice=new Invoice();
  sub:Subscription|null=null;
  sub2:Subscription|null=null;
  constructor(public ac:ActivatedRoute,public invSer:InvoiceService) { }

  ngOnInit(): void {
    this.sub = this.ac.params.subscribe(a=>{
      this.sub2 = this.invSer.getInvoiceByID(a['id']).subscribe(d=>{
         this.invoice=d.invoice;
         this.invSer.invoiceItems=d.invoiceDetails
         console.log(this.invSer.invoiceItems);
       })
    })
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.sub2?.unsubscribe();
    console.log("destroyed")
  }
}
