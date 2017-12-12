import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryNumConflictsInCountryComponent } from './query-num-conflicts-in-country.component';

describe('QueryNumConflictsInCountryComponent', () => {
  let component: QueryNumConflictsInCountryComponent;
  let fixture: ComponentFixture<QueryNumConflictsInCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryNumConflictsInCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryNumConflictsInCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
