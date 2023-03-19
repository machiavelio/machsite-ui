import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { ThemeService } from "../../services/theme/theme.service";
import { Observable } from "rxjs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { UserService } from "../../services/user/user.service";
import { MatMenuModule } from "@angular/material/menu";
import { ConnectDialogComponent } from "../../dialogs/connect-dialog/connect-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogService } from "../../services/dialog/dialog.service";

@Component({
  standalone: true,
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
  ],
})
export class HeaderComponent implements OnInit {
  isDarkTheme$!: Observable<boolean>;
  connected$!: Observable<boolean>;

  constructor(
    private readonly themeService: ThemeService,
    private readonly userService: UserService,
    private readonly dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
    this.connected$ = this.userService.connected$;
  }

  changeTheme() {
    this.themeService.toggleDarkTheme();
  }

  simpleConnect() {
    const dialog = this.dialogService.openSmall(ConnectDialogComponent);

    dialog.componentInstance.connected.subscribe(() => {
      this.userService.connect();
    });
  }

  googleConnect() {
    this.userService.connect();
  }

  disconnect() {
    this.userService.disconnect();
  }
}
