import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="feature-container">
      <h1>Customers</h1>
      <p>Manage your customer relationships.</p>
      <ul style="margin-top: 20px;">
        <li style="padding: 10px; background: white; margin: 5px 0; border-radius: 4px;">Acme Corporation - Active</li>
        <li style="padding: 10px; background: white; margin: 5px 0; border-radius: 4px;">TechStart Inc - Active</li>
        <li style="padding: 10px; background: white; margin: 5px 0; border-radius: 4px;">Global Solutions Ltd - Active</li>
      </ul>
    </div>
  `,
  styles: [`
    .feature-container { padding: 20px; }
    h1 { color: #212529; margin-bottom: 10px; }
    p { color: #6c757d; }
  `]
})
export class CustomersComponent {}
