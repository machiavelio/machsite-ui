import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConnectUserModel } from "./models/connect-user.model";
import { TokensModel } from "./models/tokens.model";

@Injectable({
  providedIn: "root",
})
export class AuthHttpService {
  constructor(private readonly http: HttpClient) {}

  check(username: string) {
    return this.http.get<boolean>("auth/check", { params: { username } });
  }

  connect(user: ConnectUserModel) {
    return this.http.post<TokensModel>("auth/connect", user);
  }

  create(user: ConnectUserModel) {
    return this.http.post<TokensModel>("auth/create", user);
  }

  disconnect() {
    return this.http.get<void>("auth/logout");
  }

  refresh() {
    return this.http.get<TokensModel>("auth/refresh");
  }

  test() {
    return this.http.get<boolean>("auth/test");
  }
}
