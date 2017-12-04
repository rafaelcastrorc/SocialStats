import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryReligionFewestCountriesComponent } from './query-religion-fewest-countries.component';

describe('QueryReligionFewestCountriesComponent', () => {
  let component: QueryReligionFewestCountriesComponent;
  let fixture: ComponentFixture<QueryReligionFewestCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryReligionFewestCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryReligionFewestCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
