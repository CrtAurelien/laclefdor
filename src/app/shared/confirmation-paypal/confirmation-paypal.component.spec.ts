import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPaypalComponent } from './confirmation-paypal.component';

describe('ConfirmationPaypalComponent', () => {
  let component: ConfirmationPaypalComponent;
  let fixture: ComponentFixture<ConfirmationPaypalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationPaypalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
