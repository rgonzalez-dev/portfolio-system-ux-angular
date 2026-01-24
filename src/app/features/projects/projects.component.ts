import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="feature-container">
      <h1>Projects</h1>
      <p>Manage and track all your projects here.</p>
      <ul style="margin-top: 20px;">
        <li style="padding: 10px; background: white; margin: 5px 0; border-radius: 4px;">Project Alpha - 75% Complete</li>
        <li style="padding: 10px; background: white; margin: 5px 0; border-radius: 4px;">Project Beta - 50% Complete</li>
        <li style="padding: 10px; background: white; margin: 5px 0; border-radius: 4px;">Project Gamma - 25% Complete</li>
      </ul>
    </div>
  `,
  styles: [`
    .feature-container { padding: 20px; }
    h1 { color: #212529; margin-bottom: 10px; }
    p { color: #6c757d; }
  `]
})
export class ProjectsComponent {}
