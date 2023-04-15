import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankOfficerComponent } from './bank-officer.component';

describe('BankOfficerComponent', () => {
  let component: BankOfficerComponent;
  let fixture: ComponentFixture<BankOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankOfficerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
