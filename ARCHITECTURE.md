# Architecture Documentation

## 🏛️ Application Structure Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    HEADER (Always Visible)                       │
│  ┌─────────┬──────────────────────────────┬────────────────────┐ │
│  │ Logo P  │ Public/Protected Menu        │ 💬 🔔 👤 [Menu]    │ │
│  └─────────┴──────────────────────────────┴────────────────────┘ │
│  [Hamburger Menu on Mobile]                                      │
└─────────────────────────────────────────────────────────────────┘
┌──────────────┬────────────────────────────────┬─────────────────┐
│  SIDEBAR     │                                │   RIGHT PANEL   │
│ (Logged-in)  │    MAIN CONTENT               │   AI CHAT       │
│              │    (Router Outlet)            │  (Logged-in)    │
│ • Dashboard  │                                │                 │
│ • Projects   │  🎯 Current Page Content       │ ┌─────────────┐ │
│   - Active   │     (Feature Components)       │ │ Chat Msgs   │ │
│   - Completed│                                │ │             │ │
│ • Finances   │                                │ │ User Input  │ │
│   - Reports  │                                │ │ [Send] →    │ │
│   - Budgets  │                                │ └─────────────┘ │
│ • Customers  │                                │                 │
│ • Reports    │                                │                 │
└──────────────┴────────────────────────────────┴─────────────────┘
```

---

## 📂 Directory Structure

### App Root
```
src/app/
├── core/                          # Application core
│   ├── services/
│   │   ├── auth.service.ts       # User auth & state (8 users pre-defined)
│   │   ├── chat.service.ts       # AI chat with context awareness
│   │   └── notification.service.ts# System notifications
│   ├── guards/
│   │   └── auth.guard.ts         # Route protection (AuthGuard)
│   ├── directives/
│   │   └── has-access.directive.ts# *appHasAccess for templates
│   └── index.ts
│
├── features/                       # Feature modules (pages)
│   ├── landing/                   # ✨ Public landing page
│   │   ├── landing.component.ts
│   │   ├── landing.component.html
│   │   └── landing.component.css
│   ├── login/                     # 🔐 Public login page
│   │   ├── login.component.ts
│   │   ├── login.component.html
│   │   └── login.component.css
│   ├── profile/                   # 👤 Public profile
│   │   ├── profile.component.ts
│   │   ├── profile.component.html
│   │   └── profile.component.css
│   ├── portfolio/                 # 📸 Public portfolio
│   │   ├── portfolio.component.ts
│   │   ├── portfolio.component.html
│   │   └── portfolio.component.css
│   ├── dashboard/                 # 📊 Protected dashboard
│   ├── projects/                  # 📁 Protected projects
│   ├── finances/                  # 💰 Protected finances
│   ├── customers/                 # 👥 Protected customers
│   └── reports/                   # 📑 Protected reports
│
├── shared/                         # Shared across components
│   └── components/
│       ├── header/                # Main header
│       │   ├── header.component.ts  (100+ lines, 8 methods)
│       │   ├── header.component.html (120+ lines)
│       │   └── header.component.css  (300+ lines)
│       ├── sidebar/               # Feature sub-navigation
│       │   ├── sidebar.component.ts  (100+ lines)
│       │   ├── sidebar.component.html
│       │   └── sidebar.component.css
│       └── chat/                  # AI assistant
│           ├── chat.component.ts
│           ├── chat.component.html
│           └── chat.component.css
│
├── app.ts                         # Root component
├── app.routes.ts                  # All routes (14 total)
├── app.config.ts                  # Providers & configuration
├── app.html                       # Root template (conditional layout)
├── app.css                        # Layout styles
│
└── index.ts
```

### Root Level
```
src/
├── main.ts                        # Bootstrap application
├── main.server.ts                 # Server entry point
├── server.ts                      # Server file
├── styles.css                     # Global styles (800+ lines)
├── index.html                     # HTML entry point
└── server.html

public/                            # Static assets
package.json                       # Dependencies
angular.json                       # Angular CLI config
tsconfig.json                      # TypeScript config
tsconfig.app.json
tsconfig.spec.json
```

---

## 🔄 Authentication Flow

### State Diagram
```
[Initial]
    ↓
[Unauthenticated] ← isAuthenticated = false
    ↓
[Landing Page] → [Portfolio] → [Profile] → [Login]
    ↓
[Enter Credentials] → demo@example.com / password
    ↓
[AuthService.login()] → 1 second delay
    ↓
[setUser(mockUser)] → isAuthenticated = true
    ↓
[Router.navigate('/dashboard')]
    ↓
[Authenticated] → Header/Sidebar/Chat visible
    ↓
[Can Access: Dashboard, Projects, Finances, Customers, Reports]
    ↓
[Click Logout]
    ↓
[setUser(null)] → isAuthenticated = false
    ↓
[Router.navigate('/')] → Landing Page
```

### User Objects
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];              // ['admin', 'user']
  permissions: string[];        // All 5 features granted
}

// Demo User (login)
{
  id: '1',
  name: 'John Doe',
  email: 'demo@example.com',
  roles: ['admin', 'user'],
  permissions: ['dashboard', 'projects', 'finances', 'customers', 'reports']
}
```

---

## 🛣️ Routing Architecture

### Route Tree
```
/ (Landing - public)
├── landing → LandingComponent
├── portfolio → PortfolioComponent
├── profile → ProfileComponent
├── login → LoginComponent
│
├── /dashboard [AuthGuard] → DashboardComponent
├── /projects [AuthGuard] → ProjectsComponent
├── /finances [AuthGuard] → FinancesComponent
├── /customers [AuthGuard] → CustomersComponent
└── /reports [AuthGuard] → ReportsComponent

14 routes total
9 protected with AuthGuard
5 public access
```

### Route Guards
```
AuthGuard (canActivate)
├── Checks: isAuthenticated()
├── Checks: hasPermission(route.data.permission)
├── If not auth → navigate('/login')
└── If no permission → navigate('/dashboard')
```

---

## 🔐 Security & Access Control

### Two-Layer Permission System

#### 1️⃣ Route Level (AuthGuard)
```typescript
{
  path: 'projects',
  component: ProjectsComponent,
  canActivate: [AuthGuard],
  data: { permission: 'projects' }
}
```

#### 2️⃣ Template Level (HasAccessDirective)
```html
<!-- Only shows if user has 'projects' permission -->
<a *appHasAccess="'projects'" [routerLink]="'/projects'">
  Projects
</a>
```

### Permission Types
- `dashboard` - Dashboard access
- `projects` - Projects feature
- `finances` - Finances feature
- `customers` - Customers feature
- `reports` - Reports feature

---

## 🎯 Component Details

### HeaderComponent
**Responsibilities:**
- Display logo
- Render navigation menu (public or authenticated)
- Handle user menu
- Show notifications icon
- Show chat icon
- Hamburger menu for mobile
- Route tracking

**Key Methods:**
```typescript
toggleMobileMenu()       // Toggle hamburger menu
toggleNotifications()    // Show/hide notifications
toggleUserMenu()         // Show/hide user menu
closeMenus()            // Close all menus
logout()                // Logout & navigate to /
isActive(route)         // Check if route is active
```

**Dynamic Content:**
- Public Menu: Portfolio, Profile
- Authenticated Menu: Dashboard, Projects, Finances, Customers, Reports
- User Menu: Login (public) / Profile, Settings, Help, Logout (authenticated)

### SidebarComponent
**Responsibilities:**
- Display feature sub-navigation
- Show sidebar only for authenticated users
- Track current feature from route
- Display sub-items relevant to feature

**Feature Sub-Navigation:**
```
Projects → [Active Projects, Completed]
Finances → [Reports, Budgets]
Customers → [Active, Inactive]
Reports → [Sales, Analytics]
```

**Behavior:**
- Hidden on Dashboard (no sub-items)
- Auto-hides on public pages
- Toggles collapse state
- Highlights active sub-route

### ChatComponent
**Responsibilities:**
- Display chat messages
- Accept user input
- Call ChatService for AI responses
- Render messages with context

**Features:**
- Context-aware responses
- Message timestamps
- User/bot message styling
- Scrollable message history

---

## 📊 Service Architecture

### AuthService (Singleton)
```typescript
Observable<User | null> user$
Observable<boolean> isAuthenticated$

Methods:
- login(email, password): Observable<User>
- logout(): void
- setUser(user): void
- getUser(): User | null
- isAuthenticated(): boolean
- hasPermission(permission): boolean
- hasRole(role): boolean
```

**State Management:**
- BehaviorSubject for user state
- BehaviorSubject for authentication state
- Observables for component subscription

### ChatService
```typescript
Methods:
- sendMessage(message: string): Observable<string>
```

**Features:**
- Context detection (detects feature from message)
- Contextual responses
- Simulated delay (500ms)

### NotificationService
```typescript
Observable<Notification[]> notifications$

Methods:
- getNotifications(): Observable<Notification[]>
- markAsRead(id): void
- addNotification(notification): void
```

---

## 🎨 Styling Architecture

### Global Styles (src/styles.css)
```css
/* Imports */
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/...');

/* CSS Custom Properties */
:root {
  --primary: #0d6efd;
  --secondary: #6c757d;
  --success: #198754;
  --danger: #dc3545;
  /* ... more colors */
}

/* Base Styles */
body, html { ... }
a, button, input { ... }

/* Layout Classes */
.app-container { ... }
.app-header { ... }
.app-body { ... }
.main-content { ... }
```

### Component Scoped Styles
- Each component has `component.css`
- Contains component-specific styling
- Uses CSS custom properties for consistency
- Media queries for responsive design

### Responsive Breakpoints
```css
/* Desktop (> 992px) */
- Full navigation menus
- Sidebar visible
- Two-column layout

/* Tablet (768px - 992px) */
- Navigation icons only (no text)
- Collapsible sidebar
- Hamburger menu

/* Mobile (< 768px) */
- Hamburger menu primary
- Full-screen mobile menu
- Stacked single-column layout
- Responsive font sizes
```

---

## 🔄 Data Flow

### Authentication State Change
```
User clicks "Login"
    ↓
LoginComponent calls authService.login(email, password)
    ↓
AuthService creates BehaviorSubject updates
    ↓
user$ Observable emits new User
    ↓
isAuthenticated$ Observable emits true
    ↓
App.component subscribes and updates isAuthenticated
    ↓
Template conditionally shows dashboard layout
    ↓
Header subscribes and shows authenticated menu
    ↓
Sidebar subscribes and displays
    ↓
Router navigates to /dashboard
```

### Navigation Change
```
User clicks "Projects" link
    ↓
Router emits NavigationEnd event
    ↓
HeaderComponent.currentRoute updates
    ↓
SidebarComponent extracts feature ('projects')
    ↓
SidebarComponent loads featureNav for 'projects'
    ↓
Sidebar displays: [Active Projects, Completed]
    ↓
Template highlights active sub-route
```

---

## 📱 Responsive Design Strategy

### Mobile-First Approach
```css
/* Base (mobile) styles */
.header-nav { display: none; }  /* Hidden by default */

/* Tablet styles (>=768px) */
@media (min-width: 768px) {
  .header-nav { display: flex; /* Icons only */ }
  .nav-label { display: none; }
}

/* Desktop styles (>992px) */
@media (min-width: 992px) {
  .nav-label { display: inline; /* Show text */ }
}
```

### Key Responsive Features
- Hamburger menu toggle
- Navigation text collapse
- Sidebar collapse/slide
- Flexible grid layouts
- Adjusted font sizes
- Touch-friendly tap targets

---

## 🧪 Component Communication

### Parent → Child (via @Input)
```typescript
@Component({
  template: `<app-sidebar (toggleSidebar)="toggleSidebar()"></app-sidebar>`
})
export class App {
  toggleSidebar() { ... }
}
```

### Child → Parent (via @Output)
```typescript
@Component({
  selector: 'app-sidebar'
})
export class Sidebar {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  toggleButtonClick() {
    this.toggleSidebar.emit();
  }
}
```

### Service-Based Communication
```typescript
// AuthService maintains state
authService.user$.subscribe(user => {
  this.user = user;
});

// Multiple components subscribe to same observable
HeaderComponent → subscribes to user$
SidebarComponent → subscribes to isAuthenticated$
App → subscribes to isAuthenticated$
```

---

## 🚀 Build & Deployment

### Development Build
```bash
npm start
# or
ng serve
```

### Production Build
```bash
npm run build
# or
ng build --configuration production
```

### Bundle Analysis
- **Total:** ~539 KB
- **Styles:** 285 KB (Bootstrap + global CSS)
- **JavaScript:** 91 KB (Angular + app code)
- **Warning:** Budget exceeded by 39 KB (can optimize)

---

## 🎯 Performance Considerations

### Current Optimizations
- Standalone components (no module overhead)
- OnPush change detection (potential)
- Bootstrap via CDN (not bundled locally)
- Lazy-loadable routes (possible future enhancement)

### Future Optimization Opportunities
- Implement OnPush change detection
- Route lazy loading
- Code splitting
- Tree shaking unused Bootstrap utilities
- Image optimization (if adding images)
- Service worker for offline support

---

## 📝 Convention & Patterns

### Naming Conventions
```
Components:     ComponentNameComponent (HeaderComponent)
Services:       ServiceNameService (AuthService)
Directives:     directiveName (appHasAccess)
Routes:         lowercase (dashboard, projects)
Classes:        PascalCase (User, MainNavItem)
Functions:      camelCase (toggleMenu, isActive)
Constants:      UPPER_CASE (API_URL)
```

### File Structure
```
feature/
├── feature-name.component.ts
├── feature-name.component.html
├── feature-name.component.css
└── feature-name.component.spec.ts (optional)
```

### Observable Pattern
```typescript
// Services expose Observables
public user$ = this.userSubject.asObservable();

// Components subscribe
this.authService.user$.subscribe(user => {
  this.user = user;
});
```

---

**Architecture Last Updated:** January 24, 2026
**Angular Version:** 21.0.5
**Design Pattern:** Component-Based with Service Layer
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
