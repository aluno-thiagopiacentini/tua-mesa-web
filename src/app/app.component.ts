import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tua-mesa';

  constructor(private route: Router) {}

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
  }
}
