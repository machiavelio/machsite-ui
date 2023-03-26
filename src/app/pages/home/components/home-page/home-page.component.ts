import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { AuthHttpService } from "src/app/core/http/auth/auth-http.service";

@Component({
  standalone: true,
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
  imports: [RouterModule, MatButtonModule],
})
export class HomePageComponent {
  constructor(private readonly authHttpService: AuthHttpService) {}

  testApi() {
    console.log("?????????");
    this.authHttpService.test().subscribe(console.log);
  }
}
