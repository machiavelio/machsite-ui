import { NgModule, isDevMode, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { RouterModule } from "@angular/router";
import { LayoutPageComponent } from "../layout/layout-page/layout-page.component";
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from "@angular/material/tooltip";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { ThemeService } from "../services/theme/theme.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutPageComponent,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (themeService: ThemeService) => {
        return (): void => themeService.configure();
      },
      multi: true,
      deps: [ThemeService],
    },
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { disableTooltipInteractivity: true } },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: "outline" } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
