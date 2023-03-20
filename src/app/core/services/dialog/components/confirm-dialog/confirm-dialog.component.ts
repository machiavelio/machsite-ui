import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"],
  imports: [MatButtonModule],
})
export class ConfirmDialogComponent {
  @Output() confirmed = new EventEmitter<boolean>();
  @Output() yesed = new EventEmitter<void>();
  @Output() noed = new EventEmitter<void>();

  @Input() message = "Are you sure?";
  @Input() yes = "Yes";
  @Input() no = "No";

  yesClick() {
    this.confirmed.emit(true);
    this.yesed.emit();
  }

  noClick() {
    this.confirmed.emit(false);
    this.noed.emit();
  }
}
