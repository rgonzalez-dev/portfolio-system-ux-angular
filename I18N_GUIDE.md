# Internationalization (i18n) Guide

## Overview

This Angular application includes comprehensive internationalization (i18n) support using a custom translation service with JSON-based translation files. The system supports multiple languages with each feature having its own translation namespace.

## Supported Languages

- **English** (en) - Default
- **Spanish** (es)
- **French** (fr)

## Architecture

### Translation Files Structure

Translation files are organized by language and feature in `src/assets/i18n/`. Each language has its own directory with feature-specific JSON files:

```
src/assets/i18n/
├── en/
│   ├── shared.json      (Header, sidebar, user menu)
│   ├── landing.json     (Landing page)
│   ├── login.json       (Login page)
│   ├── profile.json     (Profile page)
│   ├── portfolio.json   (Portfolio page)
│   ├── dashboard.json   (Dashboard)
│   ├── projects.json    (Projects feature)
│   ├── finances.json    (Finances feature)
│   ├── customers.json   (Customers feature)
│   └── reports.json     (Reports feature)
│
├── es/
│   ├── shared.json
│   ├── landing.json
│   ├── login.json
│   ├── profile.json
│   ├── portfolio.json
│   ├── dashboard.json
│   ├── projects.json
│   ├── finances.json
│   ├── customers.json
│   └── reports.json
│
└── fr/
    ├── shared.json
    ├── landing.json
    ├── login.json
    ├── profile.json
    ├── portfolio.json
    ├── dashboard.json
    ├── projects.json
    ├── finances.json
    ├── customers.json
    └── reports.json
```

## Core Services & Pipes

### TranslationService

Located in `src/app/core/services/translation.service.ts`

#### Key Methods

```typescript
// Change current language
setLanguage(language: string): void

// Get current language
getLanguage(): string

// Get supported languages
getSupportedLanguages(): string[]

// Translate a single key (synchronous)
translate(key: string): string
// Example: translationService.translate('landing.title')

// Translate a single key (observable)
translate$(key: string): Observable<string>

// Get all translations under a prefix
getTranslations(prefix: string): Translations
// Example: translationService.getTranslations('shared.header')

// Get all translations for current language
getAllTranslations(): Translations
```

#### Observables

```typescript
// Emits when language changes
currentLanguage$: Observable<string>

// Emits when translations are loaded
translationsLoaded$: Observable<boolean>
```

### TranslatePipe

Located in `src/app/core/pipes/translate.pipe.ts`

Used in templates for real-time translation with automatic updates when language changes.

## Usage Examples

### In Components (TypeScript)

```typescript
import { TranslationService } from '../../../core/services/translation.service';

export class MyComponent {
  private translationService = inject(TranslationService);

  ngOnInit() {
    // Get current language
    const lang = this.translationService.getLanguage();

    // Translate a key
    const title = this.translationService.translate('landing.title');

    // Subscribe to translations
    this.translationService.translate$('dashboard.welcome')
      .subscribe(translation => {
        console.log(translation);
      });

    // Get all shared translations
    const sharedTranslations = this.translationService.getTranslations('shared');

    // Listen to language changes
    this.translationService.currentLanguage$.subscribe(lang => {
      console.log('Language changed to:', lang);
    });
  }

  changeLanguage(language: string) {
    this.translationService.setLanguage(language);
  }
}
```

### In Templates (HTML)

```html
<!-- Using translate pipe -->
<h1>{{ 'landing.title' | translate }}</h1>

<!-- Multiple translations -->
<p>{{ 'landing.subtitle' | translate }}</p>

<!-- In attributes -->
<button [title]="'shared.userMenu.logout' | translate">
  Logout
</button>

<!-- In loops -->
<div *ngFor="let item of menuItems">
  {{ item.label | translate }}
</div>
```

## Adding New Languages

### Step 1: Create Translation Directory and Files

Create a new directory for the language code (e.g., `src/assets/i18n/de/` for German) and create a JSON file for each feature:

**src/assets/i18n/de/shared.json:**
```json
{
  "header": { ... },
  "sidebar": { ... },
  "userMenu": { ... }
}
```

**src/assets/i18n/de/landing.json:**
```json
{
  "title": "...",
  "subtitle": "...",
  ...
}
```

Repeat for all features: landing, login, profile, portfolio, dashboard, projects, finances, customers, reports.

### Step 2: Update TranslationService

Add the language to the `supportedLanguages` array in `translation.service.ts`:

```typescript
private supportedLanguages = ['en', 'es', 'fr', 'de'];
```

The service will automatically load all feature files for the new language.

### Step 3: Verify

The language switcher in the header will automatically show the new language option.

## Adding New Translation Keys

### Step 1: Add to Feature Files

Add the new key to each language's feature file where it belongs:

**src/assets/i18n/en/myFeature.json:**
```json
{
  "myKey": "My translation text"
}
```

**src/assets/i18n/es/myFeature.json:**
```json
{
  "myKey": "Mi texto traducido"
}
```

**src/assets/i18n/fr/myFeature.json:**
```json
{
  "myKey": "Mon texte traduit"
}
```

Alternatively, if the key belongs to an existing feature (e.g., `dashboard`), add it to the respective feature files:

**src/assets/i18n/en/dashboard.json:**
```json
{
  "title": "Dashboard",
  "newKey": "New feature text"
}
```

### Step 2: Use in Component

```typescript
// In TypeScript
const text = this.translationService.translate('dashboard.newKey');

// In Template
<p>{{ 'dashboard.newKey' | translate }}</p>
```

## Language Persistence

The application automatically persists the user's language preference in localStorage. When the user returns to the app:

1. If a saved language exists and is supported, it loads that language
2. Otherwise, it detects the browser's preferred language
3. Falls back to English if the browser language isn't supported

```typescript
localStorage.setItem('language', languageCode);
```

## Features

### 1. Real-Time Language Switching

When a language is changed, all components using the `translate` pipe automatically update without requiring a page reload.

### 2. Comprehensive Translation Coverage

All UI elements are translatable:
- Navigation menus
- Component titles and labels
- Form placeholders
- Button text
- Error messages
- Help text

### 3. Feature-Based Organization

Each feature has its own translation namespace:
- `landing` - Landing page
- `login` - Login page
- `profile` - Profile page
- `portfolio` - Portfolio page
- `dashboard` - Dashboard
- `projects` - Projects feature
- `finances` - Finances feature
- `customers` - Customers feature
- `reports` - Reports feature
- `shared` - Shared components (header, sidebar, menus)

## Best Practices

### 1. Use Consistent Key Names

Keep key names consistent across languages:
```typescript
// Good
'dashboard.title'
'dashboard.welcome'
'dashboard.statistics'

// Avoid
'dash.title'
'dashboard_welcome'
'DASHBOARD_STATS'
```

### 2. Organize by Feature/Scope

Always nest translations under the feature/component that uses them:

```json
{
  "projects": {
    "title": "Projects",
    "addProject": "Add Project",
    "deleteProject": "Delete Project"
  }
}
```

### 3. Use Shared for Common Items

Use the `shared` namespace for UI elements used across multiple features:

```json
{
  "shared": {
    "header": { ... },
    "sidebar": { ... },
    "userMenu": { ... }
  }
}
```

### 4. Keep Translations Simple

Translations should be simple strings without complex logic:

```json
// Good
"dashboard.welcome": "Welcome back!"

// Avoid
"dashboard.welcome": "Welcome back {{ username }}!"  // Use interpolation in component
```

If you need dynamic content, use component properties:

```typescript
welcomeMessage = `Welcome back, ${this.user.name}!`;
```

### 5. Test All Languages

Always test new features in all supported languages before committing:

```typescript
// Test changing languages
this.translationService.setLanguage('es');
this.translationService.setLanguage('fr');
this.translationService.setLanguage('en');
```

## Troubleshooting

### Translation Key Not Showing

If you see the key instead of the translation:

1. Check the key spelling and case sensitivity
2. Verify the key exists in the JSON file
3. Ensure the JSON file is valid (use a JSON validator)
4. Check browser console for errors

### Language Not Changing

1. Verify the language code is supported
2. Check localStorage for saved language
3. Inspect the header language switcher is enabled
4. Check translation service was injected correctly

### Performance Considerations

The translation service loads all language files on initialization. For large applications:

1. Consider lazy-loading language files
2. Implement caching strategies
3. Use production bundle optimization

Current implementation loads all files synchronously, suitable for most applications.

## Architecture Diagram

```
┌─────────────────────────────────────┐
│      TranslationService             │
├─────────────────────────────────────┤
│ - currentLanguage$: Observable      │
│ - translate(key): string            │
│ - setLanguage(lang): void           │
│ - getLanguage(): string             │
└────────────┬────────────────────────┘
             │
             ├──► Translation Files (JSON)
             │    ├── en.json
             │    ├── es.json
             │    └── fr.json
             │
             ├──► TranslatePipe
             │    ├── Components (Templates)
             │    └── Real-time Updates
             │
             └──► Components (TypeScript)
                  └── Programmatic Usage
```

## File Structure Summary

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── translation.service.ts        ← i18n Service
│   │   └── pipes/
│   │       └── translate.pipe.ts             ← Translation Pipe
│   └── shared/
│       └── components/
│           └── header/
│               ├── header.component.ts       ← Language Switcher
│               ├── header.component.html
│               └── header.component.css
│
└── assets/
    └── i18n/                                 ← Translation Files
        ├── en/
        │   ├── shared.json
        │   ├── landing.json
        │   ├── login.json
        │   ├── profile.json
        │   ├── portfolio.json
        │   ├── dashboard.json
        │   ├── projects.json
        │   ├── finances.json
        │   ├── customers.json
        │   └── reports.json
        │
        ├── es/
        │   ├── shared.json
        │   ├── landing.json
        │   └── ... (all feature files)
        │
        └── fr/
            ├── shared.json
            ├── landing.json
            └── ... (all feature files)
```

## Integration with Components

The translation system is pre-integrated into:

1. **HeaderComponent** - Shows language switcher (🌐) in header
2. **All feature components** - Can use `translate` pipe directly
3. **All shared components** - Full i18n support

Example: Using translations in a feature component:

```typescript
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-my-feature',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <h1>{{ 'myFeature.title' | translate }}</h1>
    <p>{{ 'myFeature.description' | translate }}</p>
  `
})
export class MyFeatureComponent {
  translationService = inject(TranslationService);
  
  // Component logic...
}
```

## Summary

The i18n system provides:
- ✅ Multi-language support (English, Spanish, French)
- ✅ Easy language switching with persistence
- ✅ Real-time UI updates on language change
- ✅ Feature-based translation organization
- ✅ Simple API for developers
- ✅ TypeScript-safe implementation
- ✅ Observable-based reactive updates
