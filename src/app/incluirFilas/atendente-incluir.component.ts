import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'atendente-incluir',
  templateUrl: './atendente-incluir.component.html',
  styleUrls: ['./atendente-incluir.component.css']
})

export class AtendenteIncluir implements OnInit {

  cursos2:string[] = ['Spring','Dart','Javascript']

  constructor() { 

  }

  ngOnInit(): void {
  }


}
