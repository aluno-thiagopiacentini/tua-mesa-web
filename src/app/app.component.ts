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
        console.log('navigation starts');
        this.isLoaded = true;
        console.log('navigation starts : ' + this.isLoaded);
      }
      else if (event instanceof NavigationEnd) {
        console.log('navigation ends');
        this.isLoaded = false;
        console.log('navigation ends : ' + this.isLoaded);
      }
    },
    error => {
      this.isLoaded = false;
      console.log(' %%%%%%%%%%%%%%%%%%%%%%%%%%% ' + error);
    }
    );
  }
}
