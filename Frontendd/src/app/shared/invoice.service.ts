import { Injectable } from '@angular/core';
import { Invoice } from './invoice';
import { InvoiceItem } from './invoice-item';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  baseurl = "https://localhost:7036/api/invoice";
  baseurl2 = "https://localhost:7036/api/invoice_detail";
  formData:InvoiceItem=new InvoiceItem();
  
  formData2:InvoiceItem=new InvoiceItem();
  formData3:Invoice=new Invoice();
  invoiceItems:InvoiceItem[]=[];
  constructor(public http:HttpClient) { }
  ngOnInit(){}

  getAllInvoices()
  {
    return this.http.get<Invoice[]>(this.baseurl);
  }

  getAllInvoiceItems()
  {
    return this.http.get<InvoiceItem[]>(this.baseurl2);
  }

  createInvoice(){
    var body = {
      ...this.formData3,
      invoice_Details: this.invoiceItems
    }
    return this.http.post(this.baseurl,body)
  }
  deleteInvoice(id:number){
    return this.http.delete<Invoice>(this.baseurl+"/"+id);
  }
  
  getInvoiceByID(id:number){
    return this.http.get<any>(this.baseurl+"/"+id)
  }
}
