import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../../shared/alert-modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WaintingLinesDetailService } from './../../wainting-line-detail/wainting-lines-detail.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';

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
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {

    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   switchMap(id => this.waintingLinesDetailService.loadById(id))
    // )
    // .subscribe(lineUp => this.updateClient(lineUp));


      const waintingLine = this.route.snapshot.data['novaEspera'];

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

  // updateClient(client){
  //   this.formNewClient.patchValue(
  //     {
  //       custmoter_name: client.custmoter_name,
  //       customer_phone_number: client.customer_phone_number
  //     },
  //   )
  // }

  hasError(field: string) {
    return this.formNewClient.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.formNewClient.value);
    if (this.formNewClient.valid) {
      console.log('submit');

      let msgSuccess = 'Cliente criado com sucesso';
      let msgError = 'Erro ao criar cliente';
      if (this.formNewClient.value.id) {
        let msgSuccess = 'Cliente atualizado com sucesso';
        let msgError = 'Erro ao atualizar cliente';
      }

      this.waintingLinesDetailService.save(this.formNewClient.value).subscribe(
        success => {
          this.alertService.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => { this.alertService.showAlertDanger(msgError); }
      );
    }
  } // end #132

  onCancel() {
    this.submitted = false;
    this.formNewClient.reset();
    this.location.back();
  }

}
