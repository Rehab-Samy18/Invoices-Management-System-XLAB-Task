import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { InvoiceItemsComponent } from './invoices/invoice-items/invoice-items.component';
import { InvoiceService } from './shared/invoice.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InvoicedetailsComponent } from './invoices/invoicedetails/invoicedetails.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoicesComponent,
    InvoiceComponent,
    InvoiceItemsComponent,
    InvoicedetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  entryComponents:[
    InvoiceItemsComponent
  ],
  providers: [InvoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
