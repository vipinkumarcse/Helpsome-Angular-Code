import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

// import { AuthenticationService } from "./auth.service";
import { map, catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
  token = "";

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userdetails=localStorage.getItem("token");
    const token: string = userdetails;

    if (token) {
      req = req.clone({ headers: req.headers.set("Authorization", token) });
    }
    req = req.clone({ headers: req.headers.set("Accept", "application/json") });
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      })
    );
  }
}
