import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

export enum alertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  // tslint:disable-next-line: typedef
  private showAlert(message: string, type: alertTypes, dismissTimout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimout){
      setTimeout(() => bsModalRef.hide(), dismissTimout);
    }
  }

  // tslint:disable-next-line: typedef
  showAlertDanger(message: string) {
    this.showAlert(message, alertTypes.DANGER);
  }

  // tslint:disable-next-line: typedef
  showAlertSuccess(message: string) {
    this.showAlert(message, alertTypes.SUCCESS, 2500);
  }

  // tslint:disable-next-line: typedef
  showConfirm(title: string, message: string, okText?: string, cancelText?: string){
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.message = message;

    if (okText) {
      bsModalRef.content.okText = okText;

    }
    if (cancelText) {
      bsModalRef.content.cancelText = cancelText;
    }

    return (bsModalRef.content as ConfirmModalComponent).confirmResult;
  }
}
