import { Pipe, PipeTransform, inject, ChangeDetectorRef } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private translationService = inject(TranslationService);
  private cdr = inject(ChangeDetectorRef);
  private lastLanguage = '';
  private lastKey = '';
  private lastResult = '';

  constructor() {
    // Subscribe to language changes to trigger pipe re-evaluation
    this.translationService.currentLanguage$.subscribe(() => {
      this.cdr.markForCheck();
    });
    
    // Subscribe to translations loaded event to update when ready
    this.translationService.translationsLoaded$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  transform(key: string): string {
    // Cache the result to avoid repeated translations
    if (key === this.lastKey && this.translationService.getLanguage() === this.lastLanguage) {
      return this.lastResult;
    }
    
    this.lastKey = key;
    this.lastLanguage = this.translationService.getLanguage();
    this.lastResult = this.translationService.translate(key);
    
    return this.lastResult;
  }
}
