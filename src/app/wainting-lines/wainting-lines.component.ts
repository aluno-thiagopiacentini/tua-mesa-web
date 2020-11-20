import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../shared/alert-modal.service';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { catchError, tap } from 'rxjs/operators';
import { Observable, empty, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { WaintingLine } from './wainting-line';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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

  bsModalRef: BsModalRef;

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
    // this.waintingLines$ = this.serviceWaintingLines.listWaintingLines()
    //                       .pipe(
    //                           catchError((error) => {
    //                             console.error(error);
    //                             // this.error$.next(true);
    //                             this.handleError();
    //                             // tslint:disable-next-line: deprecation
    //                             return empty();
    //                           })
    //                         );

    // this.serviceWaintingLines
    //   .listWaintingLines()
    //   // tslint:disable-next-line: deprecation
    //   .pipe(catchError((error) => empty()))
    //   .subscribe((dados) => {
    //     console.log(dados);
    //   });
  }

  // tslint:disable-next-line: typedef
  handleError() {
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar lista de espera.';
    this.alertService.showAlertDanger('Erro ao carregar lista de espera.');
    this.isLoaded = false;
  }

    // tslint:disable-next-line: typedef
    onDetail(id) {
      this.router.navigate(['detalhes', id]);
    }

}
