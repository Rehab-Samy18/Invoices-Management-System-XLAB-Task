import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceItemsComponent } from './invoices/invoice-items/invoice-items.component';
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [
  {path:'',redirectTo:'invoice',pathMatch:'full'},
  {path:'invoices',component:InvoicesComponent},
  {path:'invoice',children:[
    {path:'',component:InvoiceComponent},
    {path:'edit/:id',component:InvoiceComponent},
    {path:'add',component:InvoiceItemsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
