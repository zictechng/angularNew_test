import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WirecotComponent } from './wirecot.component';

describe('WirecotComponent', () => {
  let component: WirecotComponent;
  let fixture: ComponentFixture<WirecotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WirecotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WirecotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
