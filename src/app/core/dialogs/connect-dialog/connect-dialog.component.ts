import { Component, EventEmitter, Output } from "@angular/core";
import { CloseIconComponent } from "src/app/shared/components/close-icon/close-icon.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  standalone: true,
  selector: "app-connect-dialog",
  templateUrl: "./connect-dialog.component.html",
  styleUrls: ["./connect-dialog.component.scss"],
  imports: [CloseIconComponent, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
})
export class ConnectDialogComponent {
  @Output() connected = new EventEmitter<void>();

  constructor(private readonly matDialogRef: MatDialogRef<ConnectDialogComponent>) {}

  connect() {
    this.connected.emit();
    this.close();
  }

  close() {
    this.matDialogRef.close();
  }
}
