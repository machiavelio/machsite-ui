import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private connected = new BehaviorSubject(false);
  connected$ = this.connected.asObservable();

  connect() {
    this.connected.next(true);
  }

  disconnect() {
    this.connected.next(false);
  }
}
