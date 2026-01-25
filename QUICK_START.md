# Quick Start Guide

## 🚀 Getting Started

The Angular portfolio system is fully implemented with **Phase 1 MFE-ready architecture**, featuring public pages, authentication, protected features, and a complete dashboard!

### Development Server
- **URL:** http://localhost:4200/
- **Status:** Running (npm start)
- **Auto-reload:** Enabled
- **Architecture:** Phase 1 with shell/layouts, shell/features, protected-features, shared, and core separation

---

## 📖 Application Flow

### 🌐 First Visit (Unauthenticated)
1. Land on `/` (Landing page with welcome message)
2. Browse two options:
   - **📸 Portfolio** - View projects and work
   - **👤 Profile** - Learn about background and skills
3. Click user menu (👤) → "Login" to access dashboard

### 🔐 Login
- **URL:** `/login`
- **Demo Credentials:**
  - Email: `demo@example.com`
  - Password: `password`
- After login → Redirects to `/dashboard`

### 📊 Dashboard (Authenticated)
Once logged in, user sees:
- **Header** with main navigation menu
- **Sidebar** with feature sub-navigation
- **Main Content** showing dashboard content
- **Chat** panel for AI assistant
- **Notifications** bell icon with badge

---

## 🧭 Navigation Guide

### Header Navigation
**Public Users:**
```
Logo | Portfolio | Profile | ... | [User Menu: Login]
```

**Authenticated Users:**
```
Logo | Dashboard | Projects | Finances | Customers | Reports | ... | [Chat] [Notifications] [User Menu]
```

### Sidebar (Authenticated Only)
Feature-specific sub-navigation:
- **Projects:** Active Projects, Completed
- **Finances:** Reports, Budgets
- **Customers:** Active, Inactive
- **Reports:** Sales, Analytics
- Dashboard has no sub-items (sidebar hidden)

### User Menu
**Public:**
- 🔐 Login

**Authenticated:**
- 👤 Profile
- ⚙️ Settings
- ❓ Help
- 🚪 Logout → Redirects to `/`

---

## 💻 Key Features to Explore

### 1️⃣ Responsive Design
- **Desktop (>992px):** Full menu, sidebar visible
- **Tablet (768-992px):** Icons only, collapsible sidebar
- **Mobile (<768px):** Hamburger menu, stacked layout

**Test it:**
Resize browser window and watch navigation adapt!

### 2️⃣ Hamburger Menu
- Appears on tablets/mobile devices
- Click to expand/collapse
- Auto-closes on navigation
- Shows relevant menu items (public or authenticated)

### 3️⃣ Feature Sub-Navigation
- Click "Projects" → Sidebar shows project sub-items
- Click "Finances" → Sidebar shows finance sub-items
- Sidebar hides on Dashboard (no sub-items)

### 4️⃣ Active Route Highlighting
- Current page highlighted in header menu
- Current sub-page highlighted in sidebar
- Works on all screen sizes

### 5️⃣ AI Chat Assistant
- **Icon:** 💬 in header (authenticated only)
- **Click to open** right panel
- **Type message** and press Enter
- **AI responds** with context-aware replies
- **Click ✕** to close panel

### 6️⃣ Notifications
- **Icon:** 🔔 with badge counter
- **Unread items** highlighted in blue
- **Shows:** Title, message, and timestamp
- **Context:** System updates and project notifications

### 7️⃣ Permission-Based Access
- Routes protected with AuthGuard
- Menu items hidden if no permission
- Template-level control with *appHasAccess

---

## 🔍 Testing Scenarios

### Test Public Pages
```
1. Navigate to http://localhost:4200/
2. Click "Portfolio" → View project showcase
3. Click "Profile" → View professional info
4. Click back to home
```

### Test Login Flow
```
1. Click user menu (👤) → "Login"
2. Enter: demo@example.com / password
3. Click "Login"
4. Wait 1 second (simulated API call)
5. Should redirect to /dashboard
```

### Test Navigation
```
1. Click "Projects" in header
2. Sidebar shows: Active Projects, Completed
3. Click "Active Projects" → Highlights active
4. Resize to mobile → Hamburger menu
```

### Test Logout
```
1. Click user menu (👤) → "Logout"
2. Sidebar/header change to public layout
3. Menu shows: Portfolio, Profile
4. User menu shows: Login
5. Returns to landing page (/)
```

### Test Responsive
```
Desktop (>992px):
- Full text in header menu
- Sidebar shows text
- No hamburger menu

Tablet (768px-992px):
- Header shows icons only
- Hamburger menu visible
- Sidebar collapses

Mobile (<768px):
- Only hamburger menu
- Full-screen mobile menu
- Sidebar slides in from left
```

---

## 📂 Project Structure

### Public Pages
```
features/
├── landing/        # / (Welcome with Portfolio & Profile buttons)
├── login/          # /login (Authentication form)
├── portfolio/      # /portfolio (Public project showcase)
└── profile/        # /profile (Public bio & skills)
```

### Protected Pages
```
features/
├── dashboard/      # /dashboard (Overview page)
├── projects/       # /projects (Project management)
├── finances/       # /finances (Financial tracking)
├── customers/      # /customers (Customer management)
└── reports/        # /reports (Analytics & reporting)
```

### Core Infrastructure
```
core/
├── services/
│   ├── auth.service.ts      # Authentication & user state
│   ├── chat.service.ts      # AI chat responses
│   └── notification.service.ts
├── guards/
│   └── auth.guard.ts        # Route protection
└── directives/
    └── has-access.directive.ts  # *appHasAccess
```

### Shared Components
```
shared/
└── components/
    ├── header/    # Main navigation & menus
    ├── sidebar/   # Feature sub-navigation
    └── chat/      # AI chat panel
```

---

## 🔐 Authentication Details

### Initial State
- User **NOT logged in**
- Can only access public pages
- Login link in user menu

### Login Process
```typescript
// User enters credentials
email: "demo@example.com"
password: "password"

// AuthService creates user object
{
  id: '1',
  name: 'John Doe',
  email: 'demo@example.com',
  roles: ['admin', 'user'],
  permissions: ['dashboard', 'projects', 'finances', 'customers', 'reports']
}

// App updates
isAuthenticated = true
Header/Sidebar show protected menus
```

### Logout Process
```typescript
// User clicks logout
authService.logout()  // Clears user
router.navigate(['/']) // Goes to landing
```

---

## ⚙️ Common Customizations

### Change Initial Route (After Login)
Edit `src/app/features/login/login.component.ts`:
```typescript
this.router.navigate(['/projects']); // Changed from /dashboard
```

### Change Landing Page
Edit `src/app/app.routes.ts`:
```typescript
{
  path: '',
  component: PortfolioComponent  // Show portfolio instead
}
```

### Modify Public Navigation
Edit `src/app/shared/components/header/header.component.ts`:
```typescript
publicNavItems = [
  { label: 'Blog', icon: '📝', route: '/blog' },
  { label: 'Portfolio', icon: '📸', route: '/portfolio' }
];
```

### Modify Authenticated Navigation
Edit same file:
```typescript
mainNavItems: MainNavItem[] = [
  {
    label: 'Analytics',
    icon: '📊',
    route: '/analytics',
    permission: 'analytics'
  }
];
```

### Add Sidebar Sub-Items
Edit `src/app/shared/components/sidebar/sidebar.component.ts`:
```typescript
['projects', {
  feature: 'projects',
  permission: 'projects',
  title: 'Projects',
  subItems: [
    { label: 'Active Projects', icon: '📋', route: '/projects/active' },
    { label: 'Completed', icon: '✅', route: '/projects/completed' },
    { label: 'Archived', icon: '🗂️', route: '/projects/archived' } // New
  ]
}]
```

---

## 📋 Feature Checklist

- ✅ Landing page with Portfolio & Profile options
- ✅ Public profile page with skills & experience
- ✅ Public portfolio showcase with projects
- ✅ Login page with demo credentials
- ✅ Secure dashboard (authenticated only)
- ✅ 5 main features (Dashboard, Projects, Finances, Customers, Reports)
- ✅ Feature sub-navigation in sidebar
- ✅ Responsive header with hamburger menu
- ✅ Permission-based access control
- ✅ AuthGuard on protected routes
- ✅ AI Chat assistant (authenticated only)
- ✅ Notifications system
- ✅ User menu with Profile, Settings, Help, Logout
- ✅ Mobile responsive design
- ✅ Logout redirects to landing page

---

## 🐛 Troubleshooting

### App shows blank page
- Check browser console for errors
- Ensure `npm start` is running
- Try `http://localhost:4200/` (not localhost:4200)

### Navigation doesn't work
- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+Shift+R)
- Check console for routing errors

### Hamburger menu doesn't appear
- Resize window to < 768px
- Or use browser DevTools responsive mode
- Restart dev server: `npm start`

### Login not working
- Use exact credentials: `demo@example.com` / `password`
- Check network tab in DevTools (looks for delays)
- Wait 1 second after clicking Login

### Chat not appearing
- Must be logged in first
- Chat icon only visible for authenticated users
- Click 💬 icon in header

---

## 🔗 Related Documentation

- [README.md](README.md) - Project overview
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical details
- [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) - Complete reference
- [FEATURE_CHECKLIST.md](FEATURE_CHECKLIST.md) - Implementation status

---

**Last Updated:** January 24, 2026
**Angular Version:** 21.0.5
**Node Version:** v25.2.1

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

### Build Watch Mode
```bash
npm run watch
```

---

## Troubleshooting

### Port 4200 Already in Use
```bash
ng serve --port 4300
```

### Clear Node Modules & Reinstall
```bash
rm -r node_modules package-lock.json
npm install
```

### Clear Angular Cache
```bash
ng cache clean
npm start
```

---

## Browser Support

- Chrome/Chromium (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

---

## Performance Notes

- Bootstrap CSS is bundled (237KB - unoptimized for production)
- Development bundle: ~363KB
- Production build recommended for deployment

---

## Next Steps

1. ✅ **Explore the UI** - Navigate through all features
2. 📝 **Customize Components** - Modify colors, icons, text
3. 🔐 **Implement Authentication** - Connect to real auth API
4. 💾 **Add Data Services** - Connect to backend APIs
5. 🧪 **Add Unit Tests** - Create test cases for components
6. 🚀 **Deploy** - Build and deploy to production

---

## Resources

- [Angular Documentation](https://angular.dev)
- [Bootstrap Documentation](https://getbootstrap.com)
- [ng-bootstrap Components](https://ng-bootstrap.github.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Support

For questions or issues:
1. Check PROJECT_DOCUMENTATION.md for detailed architecture
2. Review component source code comments
3. Check Angular official documentation
4. Review Bootstrap styling guide

---

**Happy Coding! 🚀**
