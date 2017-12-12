import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryChangeOfReligionOverTimeComponent } from './query-change-of-religion-over-time.component';

describe('QueryChangeOfReligionOverTimeComponent', () => {
  let component: QueryChangeOfReligionOverTimeComponent;
  let fixture: ComponentFixture<QueryChangeOfReligionOverTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryChangeOfReligionOverTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryChangeOfReligionOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
