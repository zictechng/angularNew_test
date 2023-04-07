import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticSuccessfulComponent } from './domestic-successful.component';

describe('DomesticSuccessfulComponent', () => {
  let component: DomesticSuccessfulComponent;
  let fixture: ComponentFixture<DomesticSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomesticSuccessfulComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomesticSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
