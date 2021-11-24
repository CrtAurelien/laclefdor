import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurServeurComponent } from './erreur-serveur.component';

describe('ErreurServeurComponent', () => {
  let component: ErreurServeurComponent;
  let fixture: ComponentFixture<ErreurServeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErreurServeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErreurServeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
