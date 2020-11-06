import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = this.authService.token;
    if (token) request = this.getCloneRequestWithToken(request, token);

    return next.handle(request).pipe(
      catchError((err) => {
        this.catchRedirectError(err);
        return throwError(err)
      })
    )
  }
  getCloneRequestWithToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  catchRedirectError(err: any): void {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.router.navigate(['users']);
      }
    }
  }
}
