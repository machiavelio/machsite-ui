import { Component, EventEmitter, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  standalone: true,
  selector: "app-close-icon",
  templateUrl: "./close-icon.component.html",
  styleUrls: ["./close-icon.component.scss"],
  imports: [MatButtonModule, MatIconModule],
})
export class CloseIconComponent {
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
