# Angular Portfolio System - Architecture Diagram

## Application Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                          APP HEADER                              │
│  ┌──────┐                                    ┌──┬──┬──────────┐ │
│  │  P   │ (Logo)                            │💬│🔔│👤 Menu   │ │
│  └──────┘                                    └──┴──┴──────────┘ │
└─────────────────────────────────────────────────────────────────┘
┌──────────────┬───────────────────────────────────┬────────────────┐
│              │                                   │                │
│  SIDEBAR     │                                   │  RIGHT PANEL   │
│  (250px)     │      MAIN CONTENT (Router)        │  AI CHAT       │
│              │                                   │  (0-350px)     │
│  ┌────────┐  │  ┌─────────────────────────────┐  │                │
│  │📊 Dash │  │  │   Dashboard Component       │  │ ┌────────────┐ │
│  └────────┘  │  │                             │  │ │ Messages   │ │
│              │  │   Or other Feature          │  │ │            │ │
│  ┌────────┐  │  │   Components based on       │  │ │ [Input] »  │ │
│  │📁 Proj │  │  │   current route             │  │ └────────────┘ │
│  │ ▼ sub1 │  │  └─────────────────────────────┘  │                │
│  │ ▼ sub2 │  │                                   │                │
│  └────────┘  │                                   │                │
│              │                                   │                │
│  ┌────────┐  │                                   │                │
│  │💰 Fin  │  │                                   │                │
│  │ ▼ sub1 │  │                                   │                │
│  │ ▼ sub2 │  │                                   │                │
│  └────────┘  │                                   │                │
│              │                                   │                │
│  ┌────────┐  │                                   │                │
│  │👥 Cust │  │                                   │                │
│  │ ▼ sub1 │  │                                   │                │
│  │ ▼ sub2 │  │                                   │                │
│  └────────┘  │                                   │                │
│              │                                   │                │
│  ┌────────┐  │                                   │                │
│  │📑 Rep  │  │                                   │                │
│  │ ▼ sub1 │  │                                   │                │
│  │ ▼ sub2 │  │                                   │                │
│  └────────┘  │                                   │                │
│              │                                   │                │
└──────────────┴───────────────────────────────────┴────────────────┘
```

---

## Component Hierarchy

```
App (Root Component)
│
├── HeaderComponent
│   ├── Chat Icon Button → toggles ChatPanel
│   ├── Notifications Icon → shows NotificationsList
│   │   └── Notification Items (from NotificationService)
│   └── User Icon → shows UserMenu
│       └── Profile | Settings | Help | Logout
│
├── SidebarComponent
│   └── Navigation Menu
│       ├── Dashboard Item
│       ├── Projects Item
│       │   ├── Sub: Active Projects
│       │   └── Sub: Completed
│       ├── Finances Item
│       │   ├── Sub: Reports
│       │   └── Sub: Budgets
│       ├── Customers Item
│       │   ├── Sub: Active
│       │   └── Sub: Inactive
│       └── Reports Item
│           ├── Sub: Sales
│           └── Sub: Analytics
│
├── RouterOutlet (Main Content)
│   ├── DashboardComponent
│   ├── ProjectsComponent
│   ├── FinancesComponent
│   ├── CustomersComponent
│   └── ReportsComponent
│
└── Right Panel
    └── ChatComponent
        ├── Message History
        ├── User Message Display
        ├── Bot Message Display
        └── Input Field + Send Button
```

---

## Service Architecture

```
┌─────────────────────────────────────────────────────┐
│         Core Services (Singletons)                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  AuthService                                        │
│  ├── user$: Observable<User>                       │
│  ├── isAuthenticated$: Observable<boolean>         │
│  ├── setUser()                                      │
│  ├── getUser()                                      │
│  ├── isAuthenticated()                              │
│  ├── hasPermission()                                │
│  ├── hasRole()                                      │
│  ├── login()                                        │
│  └── logout()                                       │
│                                                     │
│  ChatService                                        │
│  ├── messages$: Observable<ChatMessage[]>          │
│  ├── getMessages()                                  │
│  ├── sendMessage()                                  │
│  └── clearMessages()                                │
│                                                     │
│  NotificationService                                │
│  ├── notifications$: Observable<Notification[]>    │
│  ├── getNotifications()                             │
│  ├── getUnreadCount()                               │
│  ├── markAsRead()                                   │
│  ├── markAllAsRead()                                │
│  ├── addNotification()                              │
│  └── deleteNotification()                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Guard & Directive Architecture

```
┌──────────────────────────────────────────┐
│    Route Protection & Access Control     │
├──────────────────────────────────────────┤
│                                          │
│  AuthGuard (implements CanActivate)     │
│  ├── Check: isAuthenticated()           │
│  ├── Check: hasPermission(required)     │
│  └── Redirect: /dashboard if denied     │
│                                          │
│  HasAccessDirective (Structural)         │
│  ├── *appHasAccess="permission"         │
│  ├── Shows element if permission OK     │
│  └── Hides element if denied            │
│                                          │
└──────────────────────────────────────────┘
```

---

## Routing Flow

```
┌─ App Routes ─┐
│              │
├─ /dashboard ────→ DashboardComponent (protected by AuthGuard)
│   Permission: 'dashboard'
│
├─ /projects ──────→ ProjectsComponent (protected by AuthGuard)
│   Permission: 'projects'
│   Sub-routes:
│   ├─ /projects/active
│   └─ /projects/completed
│
├─ /finances ──────→ FinancesComponent (protected by AuthGuard)
│   Permission: 'finances'
│   Sub-routes:
│   ├─ /finances/reports
│   └─ /finances/budgets
│
├─ /customers ─────→ CustomersComponent (protected by AuthGuard)
│   Permission: 'customers'
│   Sub-routes:
│   ├─ /customers/active
│   └─ /customers/inactive
│
├─ /reports ───────→ ReportsComponent (protected by AuthGuard)
│   Permission: 'reports'
│   Sub-routes:
│   ├─ /reports/sales
│   └─ /reports/analytics
│
└─ / (root) ───────→ Redirects to /dashboard
```

---

## Data Flow (Observable Patterns)

```
AuthService (State Management)
│
├─→ user$ Observable
│   └─→ HeaderComponent (displays user info)
│   └─→ SidebarComponent (checks permissions)
│   └─→ HasAccessDirective (shows/hides items)
│
ChatService (Chat Messages)
│
└─→ messages$ Observable
    └─→ ChatComponent (displays & updates messages)

NotificationService (Notifications)
│
└─→ notifications$ Observable
    └─→ HeaderComponent (displays notification list & count)
```

---

## Feature Module Structure

```
features/
├── dashboard/
│   └── dashboard.component.ts
├── projects/
│   └── projects.component.ts
├── finances/
│   └── finances.component.ts
├── customers/
│   └── customers.component.ts
└── reports/
    └── reports.component.ts

All components are:
- Standalone
- Lazy-loadable
- Routable
- Protected by AuthGuard
```

---

## Shared Component Library

```
shared/components/
├── header/
│   ├── header.component.ts
│   ├── header.component.html
│   └── header.component.css
├── sidebar/
│   ├── sidebar.component.ts
│   ├── sidebar.component.html
│   └── sidebar.component.css
└── chat/
    ├── chat.component.ts
    ├── chat.component.html
    └── chat.component.css

All components are:
- Standalone
- Reusable
- Dependency-injected
- Responsive
```

---

## Responsive Breakpoints

```
Desktop (> 992px)
├─ Sidebar: 250px (full width)
├─ Sidebar text: visible
├─ Right panel: 350px
└─ Layout: side-by-side

Tablet (768px - 992px)
├─ Sidebar: 70px (icons only)
├─ Sidebar text: hidden
├─ Right panel: 300px
└─ Layout: side-by-side

Mobile (< 768px)
├─ Sidebar: horizontal tabs
├─ Sidebar text: visible (icons above text)
├─ Right panel: full width
└─ Layout: stacked vertical
```

---

## State Management Pattern

```
Current Implementation: Service-based Observables

AuthService
├─ Provides: user$, isAuthenticated$
├─ Manages: User state and permissions
└─ Consumed by: Header, Sidebar, Guards, Directives

ChatService
├─ Provides: messages$
├─ Manages: Chat messages history
└─ Consumed by: ChatComponent

NotificationService
├─ Provides: notifications$
├─ Manages: Notification list and status
└─ Consumed by: HeaderComponent

Future Enhancement: NgRx for larger state needs
```

---

## Module Dependencies

```
app/
├─ App Component
│  ├─ Imports: HeaderComponent
│  ├─ Imports: SidebarComponent
│  ├─ Imports: ChatComponent
│  ├─ Imports: RouterModule
│  └─ Imports: CommonModule
│
HeaderComponent
├─ Imports: CommonModule
└─ Injects: AuthService

SidebarComponent
├─ Imports: CommonModule
├─ Imports: RouterModule
├─ Imports: HasAccessDirective
└─ Injects: AuthService, Router

ChatComponent
├─ Imports: CommonModule
├─ Imports: FormsModule
└─ Injects: ChatService
```

---

## Security Layers

```
Layer 1: Authentication
└─ AuthService checks if user is logged in

Layer 2: Authorization (Route Level)
└─ AuthGuard checks permissions before route access

Layer 3: Authorization (Template Level)
└─ HasAccessDirective hides unauthorized UI elements

Layer 4: Service Level
└─ Services can add additional permission checks
```

---

## Performance Optimizations

```
1. Standalone Components
   - Better tree-shaking
   - Smaller bundle size
   - Reduced boilerplate

2. OnPush Change Detection
   - Recommended for presentation components
   - Improves performance with immutable patterns

3. Lazy Loading
   - Feature modules can be lazy-loaded
   - Reduces initial bundle size

4. CSS Custom Properties
   - Theme management without regenerating CSS
   - Smaller theme files

5. Component Encapsulation
   - ViewEncapsulation: Emulated
   - Isolated styles per component
```

---

**Architecture Version:** 1.0
**Last Updated:** January 24, 2026
**Framework:** Angular 21.0.5
**UI Library:** Bootstrap 5 + ng-bootstrap
