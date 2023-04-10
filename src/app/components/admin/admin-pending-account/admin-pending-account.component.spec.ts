import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingAccountComponent } from './admin-pending-account.component';

describe('AdminPendingAccountComponent', () => {
  let component: AdminPendingAccountComponent;
  let fixture: ComponentFixture<AdminPendingAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPendingAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPendingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
