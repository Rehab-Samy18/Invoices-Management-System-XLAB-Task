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

  constructor(public invSer:InvoiceService,public router:Router,public ac:ActivatedRoute) { }

  ngOnInit(): void {
    this.refreshList();
  }

  //Edit Invoice
  edit(id:number)
  {
    this.router.navigate(['/invoice/edit/' + id])
  }

  //Refresh Invoices List
  refreshList()
  {
    this.invSer.getAllInvoices().subscribe(res => this.invoices = res)
  }

  //Delete Invoice
  onDelete(id:number){
    this.invSer.deleteInvoice(id).subscribe(res=>{
      this.refreshList();
      this.router.navigateByUrl('/invoices')
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.sub2?.unsubscribe();
  }
}
