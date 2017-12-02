import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryNumberOfFollowersComponent } from './query-number-of-followers.component';

describe('QueryNumberOfFollowersComponent', () => {
  let component: QueryNumberOfFollowersComponent;
  let fixture: ComponentFixture<QueryNumberOfFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryNumberOfFollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryNumberOfFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
