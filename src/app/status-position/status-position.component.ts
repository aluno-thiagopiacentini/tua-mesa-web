import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-position',
  templateUrl: './status-position.component.html',
  styleUrls: ['./status-position.component.scss']
})
export class StatusPositionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onRemove() {
    console.log('cliente desistiu da fila');
  }

}
