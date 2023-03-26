import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TokensModel } from "../../http/auth/models/tokens.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private connected = new BehaviorSubject(false);
  connected$ = this.connected.asObservable();

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  isConnected() {
    return this.connected.value;
  }

  disconnect() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.accessToken = null;
    this.refreshToken = null;
    this.connected.next(false);
  }

  connect(tokens: TokensModel) {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
    this.connected.next(true);
  }

  getAccessToken() {
    return this.accessToken;
  }

  getRefreshToken() {
    return this.refreshToken;
  }
}
