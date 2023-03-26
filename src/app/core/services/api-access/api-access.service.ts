import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiAccessService {
  private apiUrl = "";
  private wasConfigured = false;

  configure(apiUrl: string): void {
    if (this.wasConfigured) {
      console.warn("ApiAccess service was already configured once!");
      return;
    }

    this.wasConfigured = true;

    this.apiUrl = apiUrl;
  }

  getApiUrl(): string {
    return this.apiUrl;
  }
}
