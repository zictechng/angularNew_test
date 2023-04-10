import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSystemLogComponent } from './admin-system-log.component';

describe('AdminSystemLogComponent', () => {
  let component: AdminSystemLogComponent;
  let fixture: ComponentFixture<AdminSystemLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSystemLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSystemLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
