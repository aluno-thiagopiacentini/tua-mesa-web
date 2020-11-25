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
  ishttpLoaded = false;
  isLoaded = false;

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
      name: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
      ],
      phone_number: [
        null, [Validators.required]
      ],
      email: [
        null, [Validators.minLength(3), Validators.maxLength(100)]
      ],
      description: [
        null, [Validators.minLength(3), Validators.maxLength(100)]
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
    this.isLoaded = true;

    this.waintingLinesDetailService.save(this.formNewClient.value)
    .then( () => {
      this.alertService.showAlertSuccess('Cadastro realizado com sucesso!');
      this.isLoaded = false;
      this.location.back();
    })
    .catch( error => {
      this.isLoaded = false;
      console.log(error);
      this.alertService.showAlertDanger(error.error.message);
    });
    
    // .subscribe(
    //     success => {
    //       this.alertService.showAlertSuccess('Cadastro realizado com sucesso!');
    //       this.isLoaded = false;
    //       this.location.back();
    //     },
    //     error => {
    //       console.log(JSON.stringify(error));
    //       this.alertService.showAlertDanger(error.error.message);
    //       this.isLoaded = false;
    //     }
    //   );
  }

  onCancel() {
    this.submitted = false;
    this.isLoaded = false;
    this.formNewClient.reset();
    this.location.back();
  }

}
