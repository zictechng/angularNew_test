import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOfficerComponent } from './account-officer.component';

describe('AccountOfficerComponent', () => {
  let component: AccountOfficerComponent;
  let fixture: ComponentFixture<AccountOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOfficerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
