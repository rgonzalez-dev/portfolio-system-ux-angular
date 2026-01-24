import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';
import { HasAccessDirective } from '../../../core/directives/has-access.directive';
import { filter } from 'rxjs';

export interface MainNavItem {
  label: string;
  icon: string;
  route: string;
  permission: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HasAccessDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('notificationsMenu') notificationsMenu!: ElementRef;
  @ViewChild('userMenu') userMenu!: ElementRef;

  user: User | null = null;
  isAuthenticated = false;
  showNotifications = false;
  showUserMenu = false;
  showMobileMenu = false;
  unreadNotificationCount = 0;
  currentRoute = '';

  publicNavItems = [
    {
      label: 'Portfolio',
      icon: '📸',
      route: '/portfolio'
    },
    {
      label: 'Profile',
      icon: '👤',
      route: '/profile'
    }
  ];

  mainNavItems: MainNavItem[] = [
    {
      label: 'Dashboard',
      icon: '📊',
      route: '/dashboard',
      permission: 'dashboard'
    },
    {
      label: 'Projects',
      icon: '📁',
      route: '/projects',
      permission: 'projects'
    },
    {
      label: 'Finances',
      icon: '💰',
      route: '/finances',
      permission: 'finances'
    },
    {
      label: 'Customers',
      icon: '👥',
      route: '/customers',
      permission: 'customers'
    },
    {
      label: 'Reports',
      icon: '📑',
      route: '/reports',
      permission: 'reports'
    }
  ];

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.authService.user$.subscribe((user: User | null) => {
      this.user = user;
    });

    this.authService.isAuthenticated$.subscribe((isAuth: boolean) => {
      this.isAuthenticated = isAuth;
    });

    // Track current route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects || '';
      });
  }

  toggleNotifications(event: Event): void {
    event.stopPropagation();
    this.showNotifications = !this.showNotifications;
    this.showUserMenu = false;
  }

  toggleUserMenu(event: Event): void {
    event.stopPropagation();
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
  }

  closeMenus(): void {
    this.showNotifications = false;
    this.showUserMenu = false;
    this.showMobileMenu = false;
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    this.showNotifications = false;
    this.showUserMenu = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeMenus();
    this.router.navigate(['/']);
  }

  isActive(route: string): boolean {
    return this.currentRoute.startsWith(route);
  }
}
