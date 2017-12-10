import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryNumDeathsInCountryComponent } from './query-num-deaths-in-country.component';

describe('QueryNumDeathsInCountryComponent', () => {
  let component: QueryNumDeathsInCountryComponent;
  let fixture: ComponentFixture<QueryNumDeathsInCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryNumDeathsInCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryNumDeathsInCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
