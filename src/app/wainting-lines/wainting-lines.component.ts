import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../shared/alert-modal.service';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { WaintingLine } from './wainting-line';

import { WaintingLinesService } from './wainting-lines.service';

@Component({
  selector: 'app-wainting-lines',
  templateUrl: './wainting-lines.component.html',
  styleUrls: ['./wainting-lines.component.scss'],
})
export class WaintingLinesComponent implements OnInit {
  ishttpLoaded = false;
  isLoaded = false;
  waintingLines: WaintingLine[];

  waintingLines$: Observable<WaintingLine[]>;
  // tslint:disable-next-line: new-parens
  error$ = new Subject<boolean>();

  waintingSelected: WaintingLine;


  constructor(
    private serviceWaintingLines: WaintingLinesService,
    // private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  // tslint:disable-next-line: typedef
  onRefresh() {
    this.isLoaded = true;
    this.serviceWaintingLines.listWaintingLines().subscribe(data => {
      this.waintingLines = data.data;
      this.isLoaded = false;
      });
  }

  // tslint:disable-next-line: typedef
  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar lista de espera.');
    this.isLoaded = false;
  }

    // tslint:disable-next-line: typedef
    onDetail(id) {
      this.router.navigate(['detalhes', id]);
    }

}
