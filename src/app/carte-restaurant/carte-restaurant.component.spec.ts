import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteRestaurantComponent } from './carte-restaurant.component';

describe('CarteRestaurantComponent', () => {
  let component: CarteRestaurantComponent;
  let fixture: ComponentFixture<CarteRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
