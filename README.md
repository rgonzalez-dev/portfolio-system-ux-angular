# Portfolio System - Angular UX

A modern, responsive portfolio management system built with **Angular 21.0.5**, **Bootstrap 5**, and **TypeScript**. Features a complete authentication system, public portfolio pages, responsive design, and a full-featured dashboard for authenticated users.

## 🚀 Quick Start

### Prerequisites
- Node.js v25+
- npm v10+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200/`

## 📋 Features

### 🌐 Public Pages (Unauthenticated)
- **Landing Page** - Welcome with Portfolio & Profile navigation
- **Portfolio** - Showcase of projects with details and tech stacks
- **Profile** - Professional biography, skills, and experience
- **Login** - Secure authentication page with demo credentials

### 🔐 Protected Dashboard (Authenticated)
- **Dashboard** - Overview of key metrics and information
- **Projects** - Project management with sub-navigation (Active, Completed)
- **Finances** - Financial tracking (Reports, Budgets)
- **Customers** - Customer management (Active, Inactive)
- **Reports** - Analytics and reporting (Sales, Analytics)

### 🎨 Core Features
- ✅ **Responsive Design** - Mobile, tablet, and desktop layouts
- ✅ **Hamburger Menu** - Fully responsive navigation
- ✅ **Authentication System** - Login/Logout with auth guard
- ✅ **Permission-Based Access** - Route and template-level access control
- ✅ **Feature Sub-Navigation** - Sidebar shows sub-items per feature
- ✅ **AI Chat Assistant** - Context-aware responses (authenticated only)
- ✅ **Notifications** - System notifications with badge counter
- ✅ **User Menu** - Profile, settings, help, and logout options

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth.service.ts         # Authentication & user state
│   │   │   ├── chat.service.ts         # AI chat functionality
│   │   │   └── notification.service.ts # Notification management
│   │   ├── guards/
│   │   │   └── auth.guard.ts           # Route protection
│   │   ├── directives/
│   │   │   └── has-access.directive.ts # Template access control
│   │   └── index.ts
│   ├── features/
│   │   ├── landing/                    # Public landing page
│   │   ├── login/                      # Login page
│   │   ├── profile/                    # Public profile page
│   │   ├── portfolio/                  # Public portfolio showcase
│   │   ├── dashboard/                  # Protected dashboard
│   │   ├── projects/                   # Protected projects page
│   │   ├── finances/                   # Protected finances page
│   │   ├── customers/                  # Protected customers page
│   │   └── reports/                    # Protected reports page
│   ├── shared/
│   │   ├── components/
│   │   │   ├── header/                 # Main header with responsive menu
│   │   │   ├── sidebar/                # Feature sub-navigation sidebar
│   │   │   └── chat/                   # AI chat component
│   │   └── directives/
│   ├── app.ts                          # Root component
│   ├── app.routes.ts                   # Route configuration
│   ├── app.config.ts                   # Providers & configuration
│   └── app.css                         # Layout styles
├── styles.css                          # Global styles & Bootstrap
├── main.ts                             # Application bootstrap
└── index.html                          # HTML entry point
```

## 🔐 Authentication Flow

### Public User Journey
1. Land on `/` (Landing page)
2. Browse `/portfolio` or `/profile`
3. Click user menu → "Login"
4. Enter credentials → Dashboard access

### Demo Credentials
- **Email:** `demo@example.com`
- **Password:** `password`

### Protected Routes
All authenticated routes require login via AuthGuard:
- `/dashboard` - Permission: `dashboard`
- `/projects` - Permission: `projects`
- `/finances` - Permission: `finances`
- `/customers` - Permission: `customers`
- `/reports` - Permission: `reports`

## 🎯 Navigation Structure

### Header
- **Logo:** P (branding)
- **Public Menu:** Portfolio, Profile links
- **Authenticated Menu:** Dashboard, Projects, Finances, Customers, Reports
- **User Menu:** Profile, Settings, Help (authenticated) / Login (public)
- **Hamburger Menu:** Responsive mobile navigation
- **Actions:** Chat (authenticated only), Notifications, User menu

### Sidebar (Authenticated Only)
- **Feature-Specific Sub-Navigation**
  - Projects: Active Projects, Completed
  - Finances: Reports, Budgets
  - Customers: Active, Inactive
  - Reports: Sales, Analytics
- **Collapse Toggle:** Minimize sidebar for more content space
- **Permission Control:** Only shows items user has access to

## 💻 Technology Stack

- **Framework:** Angular 21.0.5
- **Language:** TypeScript (strict mode)
- **UI Library:** Bootstrap 5 + ng-bootstrap
- **State Management:** RxJS Observables
- **Routing:** Angular Router with Guards
- **Build Tool:** Angular CLI with Webpack
- **Styling:** CSS3 with custom properties

## 📱 Responsive Breakpoints

| Device | Width | Changes |
|--------|-------|---------|
| Desktop | > 992px | Full navigation, sidebar visible |
| Tablet | 768px - 992px | Nav icons only, collapsible sidebar |
| Mobile | < 768px | Hamburger menu, stacked layout |

## 🔧 Key Services

### AuthService
```typescript
// Start unauthenticated
login(email: string, password: string): Observable<User>
logout(): void
isAuthenticated(): boolean
hasPermission(permission: string): boolean
hasRole(role: string): boolean
```

### ChatService
```typescript
sendMessage(message: string): Observable<string>
// Provides context-aware AI responses
```

### NotificationService
```typescript
getNotifications(): Observable<Notification[]>
markAsRead(id: string): void
```

## 🛡️ Access Control

### Route-Level Protection
```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  data: { permission: 'dashboard' }
}
```

### Template-Level Control
```html
<a *appHasAccess="'projects'" [routerLink]="'/projects'">
  Projects
</a>
```

## 📦 Build & Deployment

### Development Build
```bash
npm start
```

### Production Build
```bash
npm run build
```
Output: `dist/` directory (optimized for production)

### Bundle Size
- Current: ~539 KB (with warning about budget)
- Styles: 285 KB
- JavaScript: 91 KB

## 📝 Common Tasks

### Add New Route
1. Create component in `features/`
2. Add route to `app.routes.ts`
3. Add to navigation in header/sidebar

### Add New Navigation Item
**Public Navigation:**
```typescript
publicNavItems = [
  { label: 'New Page', icon: '📄', route: '/new-page' }
];
```

**Authenticated Navigation:**
```typescript
mainNavItems: MainNavItem[] = [
  {
    label: 'New Feature',
    icon: '🎯',
    route: '/new-feature',
    permission: 'new-feature'
  }
];
```

### Modify Permissions
Edit `src/app/core/services/auth.service.ts`:
```typescript
const user: User = {
  permissions: ['dashboard', 'projects', 'finances', 'customers', 'reports']
  // Add/remove permissions
};
```

### Customize Theme
Edit `src/styles.css`:
```css
:root {
  --primary: #0d6efd;
  --secondary: #6c757d;
  /* ... more colors */
}
```

## 🐛 Troubleshooting

### Port 4200 Already in Use
```bash
ng serve --port 4201
```

### Dependencies Issue
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Size Warning
Current build exceeds budget by ~39KB. Can be optimized by:
- Code splitting
- Lazy loading routes
- Tree shaking unused code

## 📚 Documentation Files

- [QUICK_START.md](QUICK_START.md) - Feature overview and usage
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture details
- [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) - Complete reference
- [FEATURE_CHECKLIST.md](FEATURE_CHECKLIST.md) - Implementation status
- [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - Doc navigation guide

## 📄 License

This project is part of a portfolio demonstration.

---

**Last Updated:** January 24, 2026
