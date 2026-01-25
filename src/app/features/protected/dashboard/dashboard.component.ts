import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard! Here you can see all your key metrics and recent activities.</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;">
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="font-size: 24px; font-weight: bold; color: #0d6efd;">5</div>
          <div style="color: #6c757d; margin-top: 5px;">Active Projects</div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="font-size: 24px; font-weight: bold; color: #198754;">$50,000</div>
          <div style="color: #6c757d; margin-top: 5px;">Revenue</div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="font-size: 24px; font-weight: bold; color: #0dcaf0;">45</div>
          <div style="color: #6c757d; margin-top: 5px;">Customers</div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="font-size: 24px; font-weight: bold; color: #ffc107;">12</div>
          <div style="color: #6c757d; margin-top: 5px;">Pending Tasks</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    
    h1 {
      color: #212529;
      margin-bottom: 10px;
    }
    
    p {
      color: #6c757d;
    }
  `]
})
export class DashboardComponent {}
