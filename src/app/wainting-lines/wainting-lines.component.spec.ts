import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaintingLinesComponent } from './wainting-lines.component';

describe('WaintingLinesComponent', () => {
  let component: WaintingLinesComponent;
  let fixture: ComponentFixture<WaintingLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaintingLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaintingLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
