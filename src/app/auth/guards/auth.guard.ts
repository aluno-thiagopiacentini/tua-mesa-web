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
  private logged = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.authService.isLogged().subscribe(data => {
      this.logged = true;
    }, (error) => {
      // console.log(error);
      this.router.navigate(['/login']);
      this.logged = false;
    });

    return this.logged;
  }
}
