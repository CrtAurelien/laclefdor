import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchecPaypalComponent } from './echec-paypal.component';

describe('EchecPaypalComponent', () => {
  let component: EchecPaypalComponent;
  let fixture: ComponentFixture<EchecPaypalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchecPaypalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchecPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
