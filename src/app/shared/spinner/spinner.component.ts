import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  constructor() { }

  @Input() loading = false;
  @Input() httploading = false;

  ngOnInit(): void {
    
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChange): void
  {
    console.log('Changes : ' + JSON.stringify(changes));
    console.log('!!!!!!!!!!! : ' + this.loading);
  }
}
