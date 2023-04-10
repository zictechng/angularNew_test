import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllLogComponent } from './admin-all-log.component';

describe('AdminAllLogComponent', () => {
  let component: AdminAllLogComponent;
  let fixture: ComponentFixture<AdminAllLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
