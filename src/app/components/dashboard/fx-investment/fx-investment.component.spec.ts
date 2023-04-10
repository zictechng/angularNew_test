import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FxInvestmentComponent } from './fx-investment.component';

describe('FxInvestmentComponent', () => {
  let component: FxInvestmentComponent;
  let fixture: ComponentFixture<FxInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FxInvestmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FxInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
