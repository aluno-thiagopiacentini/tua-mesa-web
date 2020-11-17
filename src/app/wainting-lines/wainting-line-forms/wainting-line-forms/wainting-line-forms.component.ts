import { AlertModalService } from './../../../shared/alert-modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WaintingLinesDetailService } from './../../wainting-line-detail/wainting-lines-detail.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-wainting-line-forms',
  templateUrl: './wainting-line-forms.component.html',
  styleUrls: ['./wainting-line-forms.component.scss'],
  preserveWhitespaces: true,
})
export class WaintingLineFormsComponent implements OnInit {

  formNewClient: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private waintingLinesDetailService: WaintingLinesDetailService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    ) { }

  ngOnInit(): void {
    this.formNewClient = this.formBuilder.group({
      customer_name: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      customer_phone_number: [
        null, [Validators.required]
      ],
      obs: [
        null
      ]
    });
  }

  hasError(field: string) {
    return this.formNewClient.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.formNewClient.value);
    if (this.formNewClient.valid) {
      console.log('submit');
      this.waintingLinesDetailService.create(this.formNewClient.value).subscribe(
        success => {
          this.alertService.showAlertSuccess('Cliente inserido com sucesso');
          this.location.back();
        },
        error => this.alertService.showAlertDanger('Erro ao salvar'),
        () => console.log('request completo')
      );
    }
  } // finish #128

  onCancel() {
    this.submitted = false;
    this.formNewClient.reset();
    this.location.back();
  }


}
