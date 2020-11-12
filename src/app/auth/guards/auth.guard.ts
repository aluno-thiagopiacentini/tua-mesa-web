import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private logged = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isLogged().subscribe(data => {
      this.logged = true;
    }, (error) => {
      console.log(error);
      this.router.navigate(['/login']);
      this.logged = false;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

      return this.logged;
  }
}
