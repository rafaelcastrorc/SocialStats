import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryReligionPercentageComponent } from './query-religion-percentage.component';

describe('QueryReligionPercentageComponent', () => {
  let component: QueryReligionPercentageComponent;
  let fixture: ComponentFixture<QueryReligionPercentageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryReligionPercentageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryReligionPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
