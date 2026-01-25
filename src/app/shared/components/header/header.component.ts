import { Component, OnInit, ViewChild, ElementRef, inject, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
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
  imports: [CommonModule, RouterModule, HasAccessDirective, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('notificationsMenu') notificationsMenu!: ElementRef;
  @ViewChild('userMenu') userMenu!: ElementRef;
  @Output() toggleChat = new EventEmitter<void>();

  user: User | null = null;
  isAuthenticated = false;
  showChat = false;
  showNotifications = false;
  showUserMenu = false;
  showLanguageMenu = false;
  showMobileMenu = false;
  unreadNotificationCount = 0;
  currentRoute = '';
  currentLanguage = '';
  supportedLanguages: string[] = [];

  private authService = inject(AuthService);
  private router = inject(Router);
  public translationService = inject(TranslationService);

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

  ngOnInit(): void {
    this.authService.user$.subscribe((user: User | null) => {
      this.user = user;
    });

    this.authService.isAuthenticated$.subscribe((isAuth: boolean) => {
      this.isAuthenticated = isAuth;
    });

    // Track language changes
    this.translationService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
    });

    // Get supported languages
    this.supportedLanguages = this.translationService.getSupportedLanguages();
    this.currentLanguage = this.translationService.getLanguage();

    // Track current route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects || '';
      });
  }

  toggleChatPanel(event: Event): void {
    event.stopPropagation();
    this.showChat = !this.showChat;
    this.toggleChat.emit();
    this.showNotifications = false;
    this.showUserMenu = false;
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
    this.showLanguageMenu = false;
  }

  toggleLanguageMenu(event: Event): void {
    event.stopPropagation();
    this.showLanguageMenu = !this.showLanguageMenu;
    this.showUserMenu = false;
    this.showNotifications = false;
  }

  changeLanguage(language: string): void {
    this.translationService.setLanguage(language);
    this.currentLanguage = language;
    this.showLanguageMenu = false;
  }

  closeMenus(): void {
    this.showNotifications = false;
    this.showUserMenu = false;
    this.showLanguageMenu = false;
    this.showMobileMenu = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const header = document.querySelector('app-header');
    
    // Close all menus if click is outside header
    if (header && !header.contains(target)) {
      this.closeMenus();
    }
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
