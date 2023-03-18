import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "../header/header.component";

@Component({
  standalone: true,
  selector: "app-layout",
  templateUrl: "./layout-page.component.html",
  styleUrls: ["./layout-page.component.scss"],
  imports: [RouterModule, HeaderComponent],
})
export class LayoutPageComponent {}
