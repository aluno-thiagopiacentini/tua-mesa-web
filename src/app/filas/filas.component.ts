import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'filas',
  templateUrl: './filas.component.html',
  styleUrls: ['./filas.component.css']
})

export class Filas implements OnInit {


  constructor() { 

  }

  arrayde: any = [{
  	nome:"Douglas",
  	sobrenome: "Santos"
  },
  {nome:"Mathias",
  sobrenome:"santos"

  }

  ]
  


  ngOnInit(): void {
  }


}
