import { Injectable } from '@angular/core';
import { Invoice } from './invoice';
import { InvoiceItem } from './invoice-item';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  baseurlForInvoice = "https://localhost:7036/api/invoice";
  formData:InvoiceItem=new InvoiceItem();
  formData3:Invoice=new Invoice();
  invoiceItems:InvoiceItem[]=[];

  constructor(public http:HttpClient) { }
  ngOnInit(){}

  //Get All Invoices
  getAllInvoices()
  {
    return this.http.get<Invoice[]>(this.baseurlForInvoice);
  }

  //Create Invoice
  createInvoice(){
    var body = {
      ...this.formData3,
      invoice_Details: this.invoiceItems
    }
    return this.http.post(this.baseurlForInvoice,body)
  }

  //Delete Invoice
  deleteInvoice(id:number){
    return this.http.delete<Invoice>(this.baseurlForInvoice+"/"+id);
  }
  
  //Get Invoice By ID
  getInvoiceByID(id:number){
    return this.http.get<any>(this.baseurlForInvoice+"/"+id)
  }
}
