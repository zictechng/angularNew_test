import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInvestmentEarningComponent } from './admin-investment-earning.component';

describe('AdminInvestmentEarningComponent', () => {
  let component: AdminInvestmentEarningComponent;
  let fixture: ComponentFixture<AdminInvestmentEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInvestmentEarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInvestmentEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
