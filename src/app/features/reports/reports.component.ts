import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="feature-container">
      <h1>Reports</h1>
      <p>Generate and view various reports.</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;">
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="font-weight: bold;">Sales Report</div>
          <div style="color: #6c757d; margin-top: 5px;">Generated 2 days ago</div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="font-weight: bold;">Analytics Report</div>
          <div style="color: #6c757d; margin-top: 5px;">Generated today</div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="font-weight: bold;">Performance Report</div>
          <div style="color: #6c757d; margin-top: 5px;">Generated 1 week ago</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .feature-container { padding: 20px; }
    h1 { color: #212529; margin-bottom: 10px; }
    p { color: #6c757d; }
  `]
})
export class ReportsComponent {}
