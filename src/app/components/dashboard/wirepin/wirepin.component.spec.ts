import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WirepinComponent } from './wirepin.component';

describe('WirepinComponent', () => {
  let component: WirepinComponent;
  let fixture: ComponentFixture<WirepinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WirepinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WirepinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
