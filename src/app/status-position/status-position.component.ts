import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerPosition } from './CustomerPosition';
import { StatusPositionService } from './status-position.service';
import * as faker from 'faker';


@Component({
  selector: 'app-status-position',
  templateUrl: './status-position.component.html',
  styleUrls: ['./status-position.component.scss']
})
export class StatusPositionComponent implements OnInit {

  customerPosition: CustomerPosition;
  token: string;

  constructor(
    private service: StatusPositionService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.token = paramMap.get('token');
    });
    this.onRefresh();
  }


  onRefresh(): void {
    this.service.listPosition(this.token).subscribe( data => {
      this.customerPosition = data;
      this.customerPosition.data[0].company_logo = 'https://image.freepik.com/vetores-gratis/desenho-restaurante-bela_23-2147567264.jpg';
  });
  }

  onExitLine(token): void {
    this.service.exitLine(this.token).subscribe( data => {
      this.router.navigate(['/']);
  });
  }
}
