import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { UserService } from "../../services/user/user.service";
import { AuthHttpService } from "../../http/auth/auth-http.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly userService: UserService, private readonly authHttpService: AuthHttpService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            if (this.userService.isConnected()) {
              this.authHttpService.disconnect().subscribe();
              this.userService.disconnect();
            }
            break;
          default:
            break;
        }

        return throwError(() => error);
      }),
    );
  }
}
