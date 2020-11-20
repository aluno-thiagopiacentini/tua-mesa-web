import { ActivatedRoute, Router } from '@angular/router';
import { WaintingLinesDetailService } from './wainting-lines-detail.service';
import { Component, OnInit } from '@angular/core';
import { WaintingLinesDetail } from './wainting-lines-detail';

@Component({
  selector: 'app-wainting-line-detail',
  templateUrl: './wainting-line-detail.component.html',
  styleUrls: ['./wainting-line-detail.component.scss'],
  preserveWhitespaces: true,
})
export class WaintingLineDetailComponent implements OnInit {
  ishttpLoaded = false;
  isLoaded = false;

  waintingLinesDetail: WaintingLinesDetail;
  id: string;

  constructor(
    private service: WaintingLinesDetailService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.id = paramMap.get('id');
    });

    this.onRefresh();
  }

  onRefresh(): void {
    this.isLoaded = true;
    this.service.listWaintingLines(this.id).subscribe( data => {
      this.waintingLinesDetail = data;
      this.isLoaded = false;
    },
    this.handleError);
  }

  handleError(): void {
    console.log('*************** ERROR');
    this.isLoaded = false;
  }

  onEdit(id): void {
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onCall(id): void {
    this.isLoaded = true;
    this.service.callNextCustomer(this.id)
    .then(() => this.onRefresh())
    .catch(() => {
      this.isLoaded = false;
      this.onRefresh();
    });
  }
}
