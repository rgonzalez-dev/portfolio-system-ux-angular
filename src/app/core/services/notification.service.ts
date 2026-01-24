import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([
    {
      id: '1',
      title: 'Welcome',
      message: 'Welcome back to your dashboard',
      timestamp: new Date(),
      read: false,
      icon: 'bell'
    },
    {
      id: '2',
      title: 'New Project',
      message: 'A new project has been assigned to you',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      icon: 'folder'
    },
    {
      id: '3',
      title: 'System Update',
      message: 'System will undergo maintenance tonight',
      timestamp: new Date(Date.now() - 86400000),
      read: true,
      icon: 'info'
    }
  ]);

  public notifications$ = this.notificationsSubject.asObservable();

  constructor() {}

  getNotifications(): Notification[] {
    return this.notificationsSubject.value;
  }

  getUnreadCount(): Observable<number> {
    return new Observable(observer => {
      this.notifications$.subscribe(notifications => {
        const unreadCount = notifications.filter(n => !n.read).length;
        observer.next(unreadCount);
      });
    });
  }

  markAsRead(id: string): void {
    const notifications = this.notificationsSubject.value;
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      this.notificationsSubject.next([...notifications]);
    }
  }

  markAllAsRead(): void {
    const notifications = this.notificationsSubject.value.map(n => ({
      ...n,
      read: true
    }));
    this.notificationsSubject.next(notifications);
  }

  addNotification(notification: Omit<Notification, 'id'>): void {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString()
    };
    const notifications = [newNotification, ...this.notificationsSubject.value];
    this.notificationsSubject.next(notifications);
  }

  deleteNotification(id: string): void {
    const notifications = this.notificationsSubject.value.filter(n => n.id !== id);
    this.notificationsSubject.next(notifications);
  }
}
