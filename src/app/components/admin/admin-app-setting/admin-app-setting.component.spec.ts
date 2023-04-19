import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppSettingComponent } from './admin-app-setting.component';

describe('AdminAppSettingComponent', () => {
  let component: AdminAppSettingComponent;
  let fixture: ComponentFixture<AdminAppSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAppSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAppSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
