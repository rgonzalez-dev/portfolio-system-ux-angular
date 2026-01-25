import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shell/layouts/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ChatComponent } from './shell/layouts/chat/chat.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, ChatComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  chatPanelOpen = false;
  sidebarCollapsed = false;
  isAuthenticated = false;

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuth: boolean) => {
      this.isAuthenticated = isAuth;
    });
  }

  toggleChatPanel(): void {
    this.chatPanelOpen = !this.chatPanelOpen;
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
