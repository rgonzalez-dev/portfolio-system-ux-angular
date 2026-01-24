# Quick Start Guide

## Getting Started

The Angular portfolio system is now fully generated and running!

### Development Server Status
- **URL:** http://localhost:4200/
- **Status:** Running in development mode
- **Auto-reload:** Enabled (watch mode)

---

## First Time Setup

### 1. Initial Installation (Already Done)
```bash
npm install
npm install bootstrap @ng-bootstrap/ng-bootstrap
```

### 2. Start Development Server (Already Running)
```bash
npm start
```

---

## Key Features to Explore

### 🎯 Dashboard
- Default landing page showing key metrics
- Displays: Active Projects, Revenue, Customers, Pending Tasks

### 📁 Navigation Sidebar
- Located on the left side
- Features 5 main navigation items
- Expandable sub-menus for Projects, Finances, Customers, and Reports
- Icons collapse on tablet/mobile devices

### 💬 AI Chat Assistant
- Click the chat icon (💬) in the header
- Ask about dashboard, projects, finances, customers, or reports
- AI provides context-aware responses

### 🔔 Notifications
- Click the bell icon (🔔) to view notifications
- Shows notification count badge
- Sample notifications included for demo

### 👤 User Menu
- Click the user icon (👤) to access menu
- Options: Profile, Settings, Help, Logout
- Mock logout functionality

---

## Testing the Features

### Test Navigation
1. Click on "Projects" in the sidebar
2. Click on "Active Projects" sub-item
3. Notice the active route highlighting

### Test Access Control
- All menu items are permission-based
- Current user has access to all features
- To modify permissions: Edit `src/app/core/services/auth.service.ts`

### Test Responsive Design
- Resize browser window to tablet size (< 992px)
- Sidebar icons collapse, text hides
- At mobile size (< 768px):
  - Sidebar becomes horizontal tabs
  - Layout stacks vertically

### Test Chat Feature
1. Click chat icon (💬) in header
2. Type a message and press Enter
3. AI responds with context-based reply
4. Click close button (✕) to hide panel

---

## Project Structure Overview

```
src/
├── app/
│   ├── core/              # Core services, guards, directives
│   ├── features/          # Feature modules (Dashboard, Projects, etc.)
│   ├── shared/            # Shared components (Header, Sidebar, Chat)
│   ├── app.ts             # Root component
│   ├── app.routes.ts      # Route configuration
│   └── app.config.ts      # App providers & config
├── styles.css             # Global styles & Bootstrap import
└── index.html             # HTML entry point
```

---

## Common Tasks

### Change Default Route
Edit `src/app/app.routes.ts`:
```typescript
{
  path: '',
  redirectTo: '/dashboard',  // Change this
  pathMatch: 'full'
}
```

### Modify User Permissions
Edit `src/app/core/services/auth.service.ts`:
```typescript
const mockUser: User = {
  permissions: ['dashboard', 'projects', 'finances', 'customers', 'reports']
  // Add/remove permissions here
};
```

### Add New Navigation Item
Edit `src/app/shared/components/sidebar/sidebar.component.ts`:
```typescript
{
  label: 'New Item',
  icon: '🎯',
  route: '/new-item',
  permission: 'new-item'
}
```

### Customize Colors
Edit `src/styles.css`:
```css
:root {
  --primary-color: #0d6efd;  /* Change this */
  /* ... other colors */
}
```

---

## Useful Commands

### Start Development Server
```bash
npm start
```

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
