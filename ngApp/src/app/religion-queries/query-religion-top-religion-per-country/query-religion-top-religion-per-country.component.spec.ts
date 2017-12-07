import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryReligionTopReligionPerCountryComponent } from './query-religion-top-religion-per-country.component';

describe('QueryReligionTopReligionPerCountryComponent', () => {
  let component: QueryReligionTopReligionPerCountryComponent;
  let fixture: ComponentFixture<QueryReligionTopReligionPerCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryReligionTopReligionPerCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryReligionTopReligionPerCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
