import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'atendente',
  templateUrl: './atendente.component.html',
  styleUrls: ['./atendente.component.css']
})

export class Atendente implements OnInit {

  cursos2:string[] = ['Spring','Dart','Javascript']

  constructor() { 

  }

  ngOnInit(): void {
  }


}
