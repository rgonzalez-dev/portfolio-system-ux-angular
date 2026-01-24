import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { FinancesComponent } from './features/finances/finances.component';
import { CustomersComponent } from './features/customers/customers.component';
import { ReportsComponent } from './features/reports/reports.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { permission: 'dashboard' }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
    data: { permission: 'projects' }
  },
  {
    path: 'finances',
    component: FinancesComponent,
    canActivate: [AuthGuard],
    data: { permission: 'finances' }
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard],
    data: { permission: 'customers' }
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    data: { permission: 'reports' }
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];
