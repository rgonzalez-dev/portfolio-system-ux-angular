import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    // Simulate getting user from storage or API
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      roles: ['admin', 'user'],
      permissions: ['dashboard', 'projects', 'finances', 'customers', 'reports']
    };

    this.setUser(mockUser);
  }

  setUser(user: User | null): void {
    this.userSubject.next(user);
    this.isAuthenticatedSubject.next(user !== null);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  hasPermission(permission: string): boolean {
    const user = this.getUser();
    return user ? user.permissions.includes(permission) : false;
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user ? user.roles.includes(role) : false;
  }

  logout(): void {
    this.setUser(null);
  }

  login(email: string, password: string): Observable<User> {
    return new Observable(observer => {
      setTimeout(() => {
        const user: User = {
          id: '1',
          name: 'John Doe',
          email: email,
          roles: ['admin', 'user'],
          permissions: ['dashboard', 'projects', 'finances', 'customers', 'reports']
        };
        this.setUser(user);
        observer.next(user);
        observer.complete();
      }, 1000);
    });
  }
}
