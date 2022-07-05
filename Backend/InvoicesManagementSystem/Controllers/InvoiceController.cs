using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InvoicesManagementSystem.Data;
using InvoicesManagementSystem.Models;

namespace InvoicesManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly SalesDbContext _context;

        public InvoiceController(SalesDbContext context)
        {
            _context = context;
        }

        // GET: api/Invoice
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
          if (_context.Invoices == null)
          {
              return NotFound();
          }
            return await _context.Invoices.Include(a => a.Invoice_Details).ToListAsync();
        }

        // GET: api/Invoice/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
            var invoice = (from a in _context.Invoices
                           where a.InvoiceID == id

                           select new
                           {
                               a.InvoiceID,
                               a.CustomerName,
                               a.InvoiceDate,
                               a.InvoiceTotalQuantity,
                               a.InvoiceTotalPrice
                           }).FirstOrDefault();

            var invoiceDetails = (from a in _context.Invoice_Details
                                  where a.InvoiceID == id

                                  select new
                                  {
                                      a.InvoiceID,
                                      a.ItemName,
                                      a.PricePerUnit,
                                      a.Quantity,
                                      ItemTotalPrice = a.PricePerUnit * a.Quantity
                                  }).ToList();
            return Ok(new { invoice, invoiceDetails });
            
        }

        // PUT: api/Invoice/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, Invoice invoice)
        {
            if (id != invoice.InvoiceID)
            {
                return BadRequest();
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Invoice
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
            try
            {
                //Invoice Table
                if (invoice.InvoiceID == 0)
                    _context.Invoices.Add(invoice);

                else
                    _context.Entry(invoice).State = EntityState.Modified;


                //Invoice_Details Table
                foreach(var item in invoice.Invoice_Details)
                {
                    if(item.InvoiceID==0)
                        _context.Invoice_Details.Add(item);
                    else
                        _context.Entry(item).State = EntityState.Modified;
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex; 
            }

            return Ok();
        }

        // DELETE: api/Invoice/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            if (_context.Invoices == null)
            {
                return NotFound();
            }
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceExists(int id)
        {
            return (_context.Invoices?.Any(e => e.InvoiceID == id)).GetValueOrDefault();
        }

    }
}
