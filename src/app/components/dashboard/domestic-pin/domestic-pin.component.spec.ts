import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticPinComponent } from './domestic-pin.component';

describe('DomesticPinComponent', () => {
  let component: DomesticPinComponent;
  let fixture: ComponentFixture<DomesticPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomesticPinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomesticPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
