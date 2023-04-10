import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInvestmentComponent } from './stock-investment.component';

describe('StockInvestmentComponent', () => {
  let component: StockInvestmentComponent;
  let fixture: ComponentFixture<StockInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockInvestmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
