import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDebitComponent } from './admin-debit.component';

describe('AdminDebitComponent', () => {
  let component: AdminDebitComponent;
  let fixture: ComponentFixture<AdminDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDebitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
