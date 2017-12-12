import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryConflictLocationsComponent } from './query-conflict-locations.component';

describe('QueryConflictLocationsComponent', () => {
  let component: QueryConflictLocationsComponent;
  let fixture: ComponentFixture<QueryConflictLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryConflictLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryConflictLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
