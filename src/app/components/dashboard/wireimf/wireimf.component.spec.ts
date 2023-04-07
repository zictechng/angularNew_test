import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WireimfComponent } from './wireimf.component';

describe('WireimfComponent', () => {
  let component: WireimfComponent;
  let fixture: ComponentFixture<WireimfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WireimfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WireimfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
