import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finances',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="feature-container">
      <h1>Finances</h1>
      <p>View your financial reports and budgets.</p>
      <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
        <tr style="background: #f8f9fa; border-bottom: 1px solid #e9ecef;">
          <th style="padding: 10px; text-align: left;">Category</th>
          <th style="padding: 10px; text-align: right;">Amount</th>
        </tr>
        <tr style="border-bottom: 1px solid #e9ecef;">
          <td style="padding: 10px;">Revenue</td>
          <td style="padding: 10px; text-align: right; color: #198754;">$50,000</td>
        </tr>
        <tr style="border-bottom: 1px solid #e9ecef;">
          <td style="padding: 10px;">Expenses</td>
          <td style="padding: 10px; text-align: right; color: #dc3545;">-$30,000</td>
        </tr>
        <tr style="background: #f8f9fa; font-weight: bold;">
          <td style="padding: 10px;">Net Profit</td>
          <td style="padding: 10px; text-align: right; color: #0d6efd;">$20,000</td>
        </tr>
      </table>
    </div>
  `,
  styles: [`
    .feature-container { padding: 20px; }
    h1 { color: #212529; margin-bottom: 10px; }
    p { color: #6c757d; }
  `]
})
export class FinancesComponent {}
