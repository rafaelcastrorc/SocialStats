import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryNumConflictsInidicatorComponent } from './query-num-conflicts-inidicator.component';

describe('QueryNumConflictsInidicatorComponent', () => {
  let component: QueryNumConflictsInidicatorComponent;
  let fixture: ComponentFixture<QueryNumConflictsInidicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryNumConflictsInidicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryNumConflictsInidicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
