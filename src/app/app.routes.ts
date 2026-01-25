import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public routes (eager loaded)
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/public/landing/landing.component').then(m => m.LandingComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./features/public/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/public/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'portfolio',
        loadComponent: () => import('./features/public/portfolio/portfolio.component').then(m => m.PortfolioComponent)
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
        loadComponent: () => import('./features/protected/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: { permission: 'dashboard' }
      },
      {
        path: 'projects',
        loadComponent: () => import('./features/protected/projects/projects.component').then(m => m.ProjectsComponent),
        data: { permission: 'projects' }
      },
      {
        path: 'finances',
        loadComponent: () => import('./features/protected/finances/finances.component').then(m => m.FinancesComponent),
        data: { permission: 'finances' }
      },
      {
        path: 'customers',
        loadComponent: () => import('./features/protected/customers/customers.component').then(m => m.CustomersComponent),
        data: { permission: 'customers' }
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/protected/reports/reports.component').then(m => m.ReportsComponent),
        data: { permission: 'reports' }
      }
    ]
  }
];

