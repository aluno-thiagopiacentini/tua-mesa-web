import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() cancelText = 'Cancelar';
  @Input() okText = 'OK';

  confirmResult: Subject<boolean>;

  constructor(
    private bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  // tslint:disable-next-line: typedef
  onConfirm() {
    this.confirmAndClose(true);
  }

  // tslint:disable-next-line: typedef
  onClose() {
    this.confirmAndClose(false);
  }

  // tslint:disable-next-line: typedef
  private confirmAndClose(value: boolean){
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }
}
