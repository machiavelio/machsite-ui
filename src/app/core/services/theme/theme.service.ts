import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  private readonly DARK_THEME_KEY = "dark-theme";

  private wasConfigured = false;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  configure() {
    if (this.wasConfigured) {
      console.warn("Theme service was already configured once!");
      return;
    }

    this.wasConfigured = true;

    const darkThemeKey = localStorage.getItem(this.DARK_THEME_KEY);

    const systemThemePreference = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const darkTheme =
      darkThemeKey === null || darkThemeKey === undefined ? systemThemePreference : darkThemeKey === "true";

    this.isDarkTheme.next(darkTheme);

    this.applyDarkTheme(this.isDarkTheme.value);
  }

  applyDarkTheme(isDark: boolean) {
    this.isDarkTheme.next(isDark);

    if (isDark) {
      this.document.documentElement.classList.add(this.DARK_THEME_KEY);
    } else {
      this.document.documentElement.classList.remove(this.DARK_THEME_KEY);
    }

    localStorage.setItem(this.DARK_THEME_KEY, isDark.toString());
  }

  toggleDarkTheme() {
    this.applyDarkTheme(!this.isDarkTheme.value);
  }
}
