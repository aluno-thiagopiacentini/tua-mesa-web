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
  waintingLinesDetail: WaintingLinesDetail;

  constructor(
    private service: WaintingLinesDetailService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.service.listWaintingLines().subscribe( data => {
      console.log('Detail: ' + JSON.stringify(data));
      this.waintingLinesDetail = data;
    });
  }

  onEdit(id) {
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

}
