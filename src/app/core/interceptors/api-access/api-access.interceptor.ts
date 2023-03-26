import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiAccessService } from "../../services/api-access/api-access.service";

@Injectable()
export class ApiAccessInterceptor implements HttpInterceptor {
  constructor(private readonly apiAccessService: ApiAccessService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({ url: `${this.apiAccessService.getApiUrl()}/${request.url}` });

    return next.handle(request);
  }
}
