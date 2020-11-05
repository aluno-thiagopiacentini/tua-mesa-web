import { AuthService } from './signin/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tua-mesa';

  mostrarMenu = false;

  constructor(private authService: AuthService) {

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }
}
