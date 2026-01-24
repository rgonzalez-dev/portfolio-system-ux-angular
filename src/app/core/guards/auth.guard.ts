import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      const requiredPermission = route.data['permission'];
      
      if (requiredPermission && !this.authService.hasPermission(requiredPermission)) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
