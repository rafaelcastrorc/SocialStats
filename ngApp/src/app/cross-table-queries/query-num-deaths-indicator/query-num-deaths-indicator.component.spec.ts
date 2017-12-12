import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryNumDeathsIndicatorComponent } from './query-num-deaths-indicator.component';

describe('QueryNumDeathsIndicatorComponent', () => {
  let component: QueryNumDeathsIndicatorComponent;
  let fixture: ComponentFixture<QueryNumDeathsIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryNumDeathsIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryNumDeathsIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
