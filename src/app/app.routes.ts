import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public routes (eager loaded)
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./shell/features/landing/landing.component').then(m => m.LandingComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./shell/features/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./shell/features/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'portfolio',
        loadComponent: () => import('./shell/features/portfolio/portfolio.component').then(m => m.PortfolioComponent)
      }
    ]
  },
  // Protected routes (lazy loaded, requires authentication)
  {
    path: 'app',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./protected-features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: { permission: 'dashboard' }
      },
      {
        path: 'projects',
        loadComponent: () => import('./protected-features/projects/projects.component').then(m => m.ProjectsComponent),
        data: { permission: 'projects' }
      },
      {
        path: 'finances',
        loadComponent: () => import('./protected-features/finances/finances.component').then(m => m.FinancesComponent),
        data: { permission: 'finances' }
      },
      {
        path: 'customers',
        loadComponent: () => import('./protected-features/customers/customers.component').then(m => m.CustomersComponent),
        data: { permission: 'customers' }
      },
      {
        path: 'reports',
        loadComponent: () => import('./protected-features/reports/reports.component').then(m => m.ReportsComponent),
        data: { permission: 'reports' }
      }
    ]
  }
];

