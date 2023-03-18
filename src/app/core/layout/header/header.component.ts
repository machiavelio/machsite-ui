import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { ThemeService } from "../../services/theme/theme.service";
import { Observable } from "rxjs";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  standalone: true,
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule],
})
export class HeaderComponent implements OnInit {
  isDarkTheme$!: Observable<boolean>;

  constructor(private readonly themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }

  changeTheme() {
    this.themeService.toggleDarkTheme();
  }
}
