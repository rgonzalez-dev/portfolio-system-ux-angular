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

  private supportedLanguages = ['en', 'es', 'fr'];
  private features = ['shared', 'landing', 'login', 'profile', 'portfolio', 'dashboard', 'projects', 'finances', 'customers', 'reports'];

  constructor() {
    this.initializeLanguage();
    this.loadAllTranslations();
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
   * Load all translation files for all languages and features
   */
  private loadAllTranslations(): void {
    console.log('Starting translation loading for languages:', this.supportedLanguages);
    
    this.supportedLanguages.forEach(lang => {
      // Load the combined root-level file for the language
      // Assets are served at the root level in development, at /assets in production
      this.http.get<Translations>(`i18n/${lang}.json`)
        .subscribe({
          next: (translations) => {
            // Store the entire combined translation object
            this.translations[lang] = translations;
            console.log(`Successfully loaded ${lang}.json:`, translations);
            this.checkIfAllLoaded();
          },
          error: (error) => {
            console.error(`Failed to load ${lang}.json from i18n/${lang}.json`, error);
            this.checkIfAllLoaded();
          }
        });
    });
  }

  /**
   * Check if all translations have been loaded
   */
  private checkIfAllLoaded(): void {
    const expectedCount = this.supportedLanguages.length; // Now only 3 files (en, es, fr)
    let loadedCount = 0;

    for (const lang of this.supportedLanguages) {
      // Check if the language has translations
      if (this.translations[lang] && Object.keys(this.translations[lang]).length > 0) {
        loadedCount++;
      }
    }

    console.log(`Translations loaded: ${loadedCount}/${expectedCount}`);
    
    // Mark as loaded when all language files are loaded
    if (loadedCount >= expectedCount) {
      console.log('All translations fully loaded!');
      this.translationsLoaded.next(true);
    }
  }

  /**
   * Change the current language
   */
  setLanguage(language: string): void {
    if (this.supportedLanguages.includes(language)) {
      this.currentLanguage.next(language);
      localStorage.setItem('language', language);
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
