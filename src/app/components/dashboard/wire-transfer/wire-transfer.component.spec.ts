import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WireTransferComponent } from './wire-transfer.component';

describe('WireTransferComponent', () => {
  let component: WireTransferComponent;
  let fixture: ComponentFixture<WireTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WireTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WireTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
