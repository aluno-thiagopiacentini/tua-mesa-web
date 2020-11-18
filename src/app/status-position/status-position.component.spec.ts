import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPositionComponent } from './status-position.component';

describe('StatusPositionComponent', () => {
  let component: StatusPositionComponent;
  let fixture: ComponentFixture<StatusPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
