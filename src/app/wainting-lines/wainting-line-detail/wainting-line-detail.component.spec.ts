import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaintingLineDetailComponent } from './wainting-line-detail.component';

describe('WaintingLineDetailComponent', () => {
  let component: WaintingLineDetailComponent;
  let fixture: ComponentFixture<WaintingLineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaintingLineDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaintingLineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
