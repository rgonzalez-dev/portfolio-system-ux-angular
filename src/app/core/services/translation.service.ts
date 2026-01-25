import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Translations {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private http = inject(HttpClient);
  
  private currentLanguage = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.currentLanguage.asObservable();
  
  private translations: { [key: string]: Translations } = {};
  private translationsLoaded = new BehaviorSubject<boolean>(false);
  public translationsLoaded$ = this.translationsLoaded.asObservable();
  
  private loadedLanguages = new Set<string>();
  private languagesLoading = new Map<string, Promise<void>>();

  private supportedLanguages = ['en', 'es', 'fr'];
  private features = ['shared', 'landing', 'login', 'profile', 'portfolio', 'dashboard', 'projects', 'finances', 'customers', 'reports'];

  constructor() {
    this.initializeLanguage();
    // Eager load the default language
    this.loadDefaultLanguage();
    // Lazy load other languages in the background
    this.lazyLoadOtherLanguages();
  }

  /**
   * Initialize language from localStorage or default to English
   */
  private initializeLanguage(): void {
    const savedLanguage = localStorage.getItem('language');
    let languageToUse = 'en'; // Default to English
    
    // Only use saved language if it's in supported languages
    if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
      languageToUse = savedLanguage;
    }
    
    // Always set to the determined language
    this.currentLanguage.next(languageToUse);
    localStorage.setItem('language', languageToUse);
  }

  /**
   * Get browser's preferred language
   */
  private getBrowserLanguage(): string {
    const language = navigator.language.split('-')[0];
    return this.supportedLanguages.includes(language) ? language : 'en';
  }

  /**
   * Eagerly load the default language (EN) to improve initial load performance
   */
  private loadDefaultLanguage(): void {
    const defaultLang = this.currentLanguage.value;
    console.log(`Eager loading default language: ${defaultLang}`);
    
    this.http.get<Translations>(`i18n/${defaultLang}.json`)
      .subscribe({
        next: (translations) => {
          this.translations[defaultLang] = translations;
          this.loadedLanguages.add(defaultLang);
          console.log(`Successfully loaded default language ${defaultLang}.json`);
          // Mark as ready once the default language is loaded
          this.translationsLoaded.next(true);
        },
        error: (error) => {
          console.error(`Failed to load default language ${defaultLang}.json`, error);
          // Still mark as loaded even if there's an error, so app can proceed
          this.translationsLoaded.next(true);
        }
      });
  }

  /**
   * Lazy load other languages in the background without blocking the UI
   */
  private lazyLoadOtherLanguages(): void {
    // Wait a bit to let the app render first
    setTimeout(() => {
      const defaultLang = this.currentLanguage.value;
      const otherLanguages = this.supportedLanguages.filter(lang => lang !== defaultLang);
      
      console.log(`Lazy loading other languages in background: ${otherLanguages.join(', ')}`);
      
      otherLanguages.forEach(lang => {
        this.loadLanguageInBackground(lang);
      });
    }, 500);
  }

  /**
   * Load a language in the background without blocking the UI
   */
  private loadLanguageInBackground(lang: string): void {
    if (this.loadedLanguages.has(lang) || this.languagesLoading.has(lang)) {
      return; // Already loaded or loading
    }

    const loadPromise = new Promise<void>((resolve) => {
      this.http.get<Translations>(`i18n/${lang}.json`)
        .subscribe({
          next: (translations) => {
            this.translations[lang] = translations;
            this.loadedLanguages.add(lang);
            console.log(`Successfully lazy loaded ${lang}.json`);
            this.languagesLoading.delete(lang);
            resolve();
          },
          error: (error) => {
            console.warn(`Failed to lazy load ${lang}.json`, error);
            this.languagesLoading.delete(lang);
            resolve();
          }
        });
    });

    this.languagesLoading.set(lang, loadPromise);
  }

  /**
   * Ensure a language is loaded before translating (loads on demand if needed)
   */
  private async ensureLanguageLoaded(lang: string): Promise<void> {
    if (this.loadedLanguages.has(lang)) {
      return; // Already loaded
    }

    if (this.languagesLoading.has(lang)) {
      return this.languagesLoading.get(lang); // Already loading, wait for it
    }

    // Load it now (synchronous for already loaded languages, async for others)
    return new Promise<void>((resolve) => {
      this.http.get<Translations>(`i18n/${lang}.json`)
        .subscribe({
          next: (translations) => {
            this.translations[lang] = translations;
            this.loadedLanguages.add(lang);
            console.log(`On-demand loaded ${lang}.json`);
            this.languagesLoading.delete(lang);
            resolve();
          },
          error: (error) => {
            console.warn(`Failed to load ${lang}.json on demand`, error);
            this.languagesLoading.delete(lang);
            resolve();
          }
        });
    });
  }

  /**
   * Change the current language
   */
  setLanguage(language: string): void {
    if (this.supportedLanguages.includes(language)) {
      this.currentLanguage.next(language);
      localStorage.setItem('language', language);
      
      // Ensure the language is loaded when switching
      this.ensureLanguageLoaded(language).catch(err => {
        console.warn(`Error ensuring language ${language} is loaded:`, err);
      });
    }
  }

  /**
   * Get current language
   */
  getLanguage(): string {
    return this.currentLanguage.value;
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }

  /**
   * Get translation for a specific key using dot notation
   * Example: translate('shared.userMenu.profile')
   */
  translate(key: string): string {
    const language = this.currentLanguage.value;
    const keys = key.split('.');
    
    // Start from language translations
    let value: any = this.translations[language];
    
    // If language translations don't exist, log and return key
    if (!value) {
      console.warn(`Translations not loaded for language: ${language}`);
      return key;
    }

    // Navigate through the key path
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // If we can't find the key, log and return the original key
        console.warn(`Translation not found for key: "${key}" at path segment: "${k}"`);
        return key;
      }
    }

    // Return the value if found and it's a string, otherwise return the original key
    if (value && typeof value === 'string') {
      return value;
    }
    
    console.warn(`Translation key "${key}" did not resolve to a string. Got:`, value);
    return key;
  }

  /**
   * Get translation for a specific key as Observable
   */
  translate$(key: string): Observable<string> {
    return this.currentLanguage$.pipe(
      map(() => this.translate(key))
    );
  }

  /**
   * Get multiple translations by prefix
   * Example: getTranslations('shared.header') returns all header translations
   */
  getTranslations(prefix: string): Translations {
    const language = this.currentLanguage.value;
    const keys = prefix.split('.');
    let value: any = this.translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value ? value : {};
  }

  /**
   * Get all translations for current language
   */
  getAllTranslations(): Translations {
    return this.translations[this.currentLanguage.value] || {};
  }
}
