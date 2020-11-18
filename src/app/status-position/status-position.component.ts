import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusPositionService } from './status-position.service';


@Component({
  selector: 'app-status-position',
  templateUrl: './status-position.component.html',
  styleUrls: ['./status-position.component.scss']
})
export class StatusPositionComponent implements OnInit {

  data: Position;
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
      this.data = data;
  });
  }
}
