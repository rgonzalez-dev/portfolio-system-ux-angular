import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HasAccessDirective } from '../../../core/directives/has-access.directive';
import { filter } from 'rxjs';

export interface NavSubItem {
  label: string;
  icon: string;
  route: string;
  permission: string;
}

export interface FeatureNav {
  feature: string;
  permission: string;
  title: string;
  subItems: NavSubItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, HasAccessDirective],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  collapsed = false;
  currentFeature = '';
  currentRoute = '';

  featureNavMap: Map<string, FeatureNav> = new Map([
    ['projects', {
      feature: 'projects',
      permission: 'projects',
      title: 'Projects',
      subItems: [
        { label: 'Active Projects', icon: '📋', route: '/projects/active', permission: 'projects' },
        { label: 'Completed', icon: '✅', route: '/projects/completed', permission: 'projects' }
      ]
    }],
    ['finances', {
      feature: 'finances',
      permission: 'finances',
      title: 'Finances',
      subItems: [
        { label: 'Reports', icon: '📈', route: '/finances/reports', permission: 'finances' },
        { label: 'Budgets', icon: '💳', route: '/finances/budgets', permission: 'finances' }
      ]
    }],
    ['customers', {
      feature: 'customers',
      permission: 'customers',
      title: 'Customers',
      subItems: [
        { label: 'Active', icon: '⭐', route: '/customers/active', permission: 'customers' },
        { label: 'Inactive', icon: '⏸️', route: '/customers/inactive', permission: 'customers' }
      ]
    }],
    ['reports', {
      feature: 'reports',
      permission: 'reports',
      title: 'Reports',
      subItems: [
        { label: 'Sales', icon: '📊', route: '/reports/sales', permission: 'reports' },
        { label: 'Analytics', icon: '📉', route: '/reports/analytics', permission: 'reports' }
      ]
    }]
  ]);

  currentFeatureNav: FeatureNav | null = null;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects || '';
        this.extractFeatureFromRoute();
      });

    this.extractFeatureFromRoute();
  }

  private extractFeatureFromRoute(): void {
    const routeParts = this.currentRoute.split('/');
    const feature = routeParts[1] || '';

    if (feature && this.featureNavMap.has(feature)) {
      this.currentFeature = feature;
      this.currentFeatureNav = this.featureNavMap.get(feature) || null;
    } else {
      this.currentFeature = '';
      this.currentFeatureNav = null;
    }
  }

  toggleSidebarCollapse(): void {
    this.collapsed = !this.collapsed;
    this.toggleSidebar.emit();
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  hasSubItems(): boolean {
    return this.currentFeatureNav !== null && this.currentFeatureNav.subItems.length > 0;
  }
}
