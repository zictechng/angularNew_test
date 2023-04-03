import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavNotificationComponent } from './nav-notification.component';

describe('NavNotificationComponent', () => {
  let component: NavNotificationComponent;
  let fixture: ComponentFixture<NavNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
