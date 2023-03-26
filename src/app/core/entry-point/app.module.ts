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
import { ApiAccessService } from "../services/api-access/api-access.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiAccessInterceptor } from "../interceptors/api-access/api-access.interceptor";
import { UserService } from "../services/user/user.service";
import { AuthInterceptor } from "../interceptors/auth/auth.interceptor";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { ErrorInterceptor } from "../interceptors/error/error.interceptor";

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
      useFactory: (apiAccessService: ApiAccessService) => {
        return () => {
          const apiUrl = isDevMode() ? "http://localhost:3000" : "";

          apiAccessService.configure(apiUrl);
        };
      },
      multi: true,
      deps: [ApiAccessService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (userService: UserService) => {
        return () => {
          const accessToken = localStorage.getItem("accessToken");
          const refreshToken = localStorage.getItem("refreshToken");

          if (accessToken && refreshToken) {
            userService.connect({ accessToken, refreshToken });
          }
        };
      },
      multi: true,
      deps: [UserService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (themeService: ThemeService) => {
        return () => themeService.configure();
      },
      multi: true,
      deps: [ThemeService],
    },

    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,

    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { disableTooltipInteractivity: true } },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: "outline" } },

    { provide: HTTP_INTERCEPTORS, useClass: ApiAccessInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
