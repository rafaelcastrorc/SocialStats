import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryAllDbComponent } from './query-all-db.component';

describe('QueryAllDbComponent', () => {
  let component: QueryAllDbComponent;
  let fixture: ComponentFixture<QueryAllDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryAllDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryAllDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
