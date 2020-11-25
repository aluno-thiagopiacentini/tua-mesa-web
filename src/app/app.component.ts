import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tua-mesa';
  logged = false;

  constructor(private route: Router,
              private authService: AuthService) {}

  isLoaded = false;
  ishttpLoaded = false;

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.route.events.subscribe( event => {
      if (event instanceof NavigationStart) {
        this.isLoaded = true;
      }
      else if (event instanceof NavigationEnd) {
        this.isLoaded = false;
      }
    },
    error => {
      this.isLoaded = false;
    }
    );
    this.ngOnRefresh();
  }

  ngOnRefresh(): void {
    this.authService.isLogged().subscribe(data => {
      this.logged = true;
    }, (error) => {
      this.logged = false;
    });
  }
}
