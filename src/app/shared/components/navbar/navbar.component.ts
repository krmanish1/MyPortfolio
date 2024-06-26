import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {



  isMenuOpen = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    // private scrollService: ServiceService,
    private cdr: ChangeDetectorRef,
    // private serviceModal: NgbModal
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize Flowbite or any other library that relies on the document object here
      // For example:
      // initFlowbite();
      // Check localStorage for the stored theme and apply it
      const storedTheme = localStorage.getItem('color-theme');
      if (storedTheme) {
        this.applyTheme(storedTheme as 'dark' | 'light');
      } else {
        // If no theme is stored, set the default theme to dark
        this.applyTheme('dark');
      }

      // Apply the initial theme
      this.toggleIconsBasedOnTheme();
    }

  }

  applyTheme(theme: 'dark' | 'light'): void {
    if (theme === 'dark') {
      this.renderer.addClass(this.document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark');
    }
    // Update localStorage with the current theme
    localStorage.setItem('color-theme', theme);
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  toggleMenu() {
    const menu = document.querySelector('.navbar-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @ViewChild('themeToggleDarkIcon', { static: true }) themeToggleDarkIcon: ElementRef | undefined;
  @ViewChild('themeToggleLightIcon', { static: true }) themeToggleLightIcon: ElementRef | undefined;
  @ViewChild('themeToggleBtn', { static: true }) themeToggleBtn: ElementRef | undefined;

  ngAfterViewInit(): void {
    this.toggleIconsBasedOnTheme();
    if (this.themeToggleBtn) {
      this.themeToggleBtn.nativeElement.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleIconsBasedOnTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const theme = localStorage.getItem('color-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      if (theme === 'dark') {
        if (this.themeToggleLightIcon && this.themeToggleLightIcon.nativeElement) {
          this.renderer.addClass(this.themeToggleLightIcon.nativeElement, 'hidden');
        }
        if (this.themeToggleDarkIcon && this.themeToggleDarkIcon.nativeElement) {
          this.renderer.removeClass(this.themeToggleDarkIcon.nativeElement, 'hidden');
        }
      } else {
        if (this.themeToggleDarkIcon && this.themeToggleDarkIcon.nativeElement) {
          this.renderer.addClass(this.themeToggleDarkIcon.nativeElement, 'hidden');
        }
        if (this.themeToggleLightIcon && this.themeToggleLightIcon.nativeElement) {
          this.renderer.removeClass(this.themeToggleLightIcon.nativeElement, 'hidden');
        }
      }
      this.cdr.detectChanges();
    }
  }

  toggleTheme(): void {
    const theme = localStorage.getItem('color-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'light') {
      this.renderer.addClass(this.document.documentElement, 'dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark');
      localStorage.setItem('color-theme', 'light');
    }
    this.toggleIconsBasedOnTheme();
  }

  scrollToSection(sectionId: string) {
    // this.scrollService.scrollTo('#' + sectionId);
  }





}
