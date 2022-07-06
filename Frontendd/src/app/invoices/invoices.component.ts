import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from '../shared/invoice';
import { InvoiceService } from '../shared/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  formData:Invoice=new Invoice();
  invoices:Invoice[]=[];
  sub:Subscription|null=null;
  sub2:Subscription|null=null;
  ID:any="";
  invoiceList:Invoice[]=[]
  constructor(public invSer:InvoiceService,public router:Router,public ac:ActivatedRoute) { }

  ngOnInit(): void {
    this.refreshList();
  }
  edit(id:number)
  {
    this.router.navigate(['/invoice/edit/' + id])
  }

  refreshList()
  {
    this.invSer.getAllInvoices().subscribe(res => this.invoices = res)
  }
  onDelete(id:number){
    this.invSer.deleteInvoice(id).subscribe(res=>{
      this.refreshList();
      this.router.navigateByUrl('/invoices')
    })
  }

  onSearch(id:number)
  {
    this.sub = this.ac.params.subscribe(a=>{
      this.sub2 = this.invSer.getInvoiceByID(a['id']).subscribe(d=>{
         this.invSer.formData3=d.invoice
         this.invSer.invoiceItems=d.invoiceDetails
         console.log(d);
       })
    })
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.sub2?.unsubscribe();
  }
}
