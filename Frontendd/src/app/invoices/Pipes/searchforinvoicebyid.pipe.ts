import { Pipe, PipeTransform } from '@angular/core';
import { Invoice } from 'src/app/shared/invoice';

@Pipe({
  name: 'searchforinvoicebyid'
})
export class SearchforinvoicebyidPipe implements PipeTransform {

  transform(invoiceList: Invoice[],Id:number=Number()): Invoice {
    let invoice:Invoice=new Invoice();
    for(let i=0;i<invoiceList.length;i++)
    {
      if(invoiceList[i].invoiceID==Id)
      {
        invoice=invoiceList[i];
      }
    }
    return invoice;
  }

}
