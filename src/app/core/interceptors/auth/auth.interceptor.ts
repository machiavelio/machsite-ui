import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable, switchMap } from "rxjs";
import { UserService } from "../../services/user/user.service";
import { AuthHttpService } from "../../http/auth/auth-http.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly userService: UserService,
    private readonly authHttpService: AuthHttpService,
    private readonly jwtHelperService: JwtHelperService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.userService.getAccessToken();

    if (request.url.includes("auth/refresh")) {
      const refreshToken = this.userService.getRefreshToken();

      return this.handleRequestWithToken(request, next, refreshToken);
    }

    if (this.jwtHelperService.isTokenExpired(accessToken)) {
      return this.authHttpService.refresh().pipe(
        switchMap((response) => {
          this.userService.connect(response);

          return this.handleRequestWithToken(request, next, response.accessToken);
        }),
      );
    }

    return this.handleRequestWithToken(request, next, accessToken);
  }

  handleRequestWithToken(request: HttpRequest<unknown>, next: HttpHandler, token: string | null) {
    if (token) {
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
