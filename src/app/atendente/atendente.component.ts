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

  Valordoback: number

  Senha: number;
  Usuario: string;
  Email: string;

  nome1(){
  	console.log(this.Senha)
  	if(this.Valordoback == this.Senha){
  	console.log("correto")
  	}
  	
  }

  ngOnInit(): void {
  }


}
