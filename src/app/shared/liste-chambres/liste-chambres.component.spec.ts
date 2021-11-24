import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeChambresComponent } from './liste-chambres.component';

describe('ListeChambresComponent', () => {
  let component: ListeChambresComponent;
  let fixture: ComponentFixture<ListeChambresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeChambresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeChambresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
