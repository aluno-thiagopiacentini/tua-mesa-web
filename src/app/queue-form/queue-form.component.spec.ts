import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueFormComponent } from './queue-form.component';

describe('QueueFormComponent', () => {
  let component: QueueFormComponent;
  let fixture: ComponentFixture<QueueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
