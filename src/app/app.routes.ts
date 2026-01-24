import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { FinancesComponent } from './features/finances/finances.component';
import { CustomersComponent } from './features/customers/customers.component';
import { ReportsComponent } from './features/reports/reports.component';
import { LandingComponent } from './features/landing/landing.component';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
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
  }
];

