import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { CloseIconComponent } from "src/app/shared/components/close-icon/close-icon.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ConnectUserModel } from "../../http/auth/models/connect-user.model";
import { AuthHttpService } from "../../http/auth/auth-http.service";
import { DialogService } from "../../services/dialog/dialog.service";
import { CommonModule } from "@angular/common";
import { switchMap } from "rxjs";
import { UserService } from "../../services/user/user.service";

@Component({
  standalone: true,
  selector: "app-connect-dialog",
  templateUrl: "./connect-dialog.component.html",
  styleUrls: ["./connect-dialog.component.scss"],
  imports: [
    CommonModule,
    CloseIconComponent,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class ConnectDialogComponent {
  @Output() connected = new EventEmitter<ConnectUserModel>();

  form = this.formBuilder.group({
    username: "",
    password: "",
  });

  invalidPassword = false;

  constructor(
    private readonly matDialogRef: MatDialogRef<ConnectDialogComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly authHttpService: AuthHttpService,
    private readonly dialogService: DialogService,
    private readonly userService: UserService,
  ) {}

  connect() {
    this.invalidPassword = false;

    const model = this.form.value as ConnectUserModel;

    this.authHttpService.check(model.username).subscribe((response) => {
      if (response) {
        this.authHttpService.connect(model).subscribe({
          next: (response) => {
            this.userService.connect(response);
            this.close();
          },
          error: () => {
            this.invalidPassword = true;
          },
        });
      } else {
        this.dialogService
          .openConfirm("This Username does not link to any existing account. Do you wish to create a new one?")
          .yesed.subscribe(() => {
            this.authHttpService.create(model).subscribe((response) => {
              this.userService.connect(response);
              this.close();
            });
          });
      }
    });
  }

  close() {
    this.matDialogRef.close();
  }
}
