import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngroInvestmentComponent } from './angro-investment.component';

describe('AngroInvestmentComponent', () => {
  let component: AngroInvestmentComponent;
  let fixture: ComponentFixture<AngroInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngroInvestmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngroInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
