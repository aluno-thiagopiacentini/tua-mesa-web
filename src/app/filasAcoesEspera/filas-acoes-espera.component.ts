import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'filas-acoes-espera',
  templateUrl: './filas-acoes-espera.component.html',
  styleUrls: ['./filas-acoes-espera.component.css']
})

export class FilasAcoesEspera implements OnInit {

  cursos2:string[] = ['Spring','Dart','Javascript']

  constructor() { 

  }

  ngOnInit(): void {
  
  }


}
