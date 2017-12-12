import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryNumConflictsIndicatorComponent } from './query-num-conflicts-indicator.component';

describe('QueryNumConflictsIndicatorComponent', () => {
  let component: QueryNumConflictsIndicatorComponent;
  let fixture: ComponentFixture<QueryNumConflictsIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryNumConflictsIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryNumConflictsIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
