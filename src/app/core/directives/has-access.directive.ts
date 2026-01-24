import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasAccess]',
  standalone: true
})
export class HasAccessDirective implements OnInit {
  private permissions: string[] = [];
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  @Input()
  set appHasAccess(val: string | string[]) {
    this.permissions = Array.isArray(val) ? val : [val];
    this.updateView();
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(() => {
      this.updateView();
    });
  }

  private updateView(): void {
    const hasAccess = this.permissions.some(permission =>
      this.authService.hasPermission(permission)
    );

    if (hasAccess && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasAccess && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
