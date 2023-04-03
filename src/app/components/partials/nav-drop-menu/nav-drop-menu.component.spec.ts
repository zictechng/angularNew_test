import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDropMenuComponent } from './nav-drop-menu.component';

describe('NavDropMenuComponent', () => {
  let component: NavDropMenuComponent;
  let fixture: ComponentFixture<NavDropMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavDropMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavDropMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
