import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryReligionWbComponent } from './query-religion-wb.component';

describe('QueryReligionWbComponent', () => {
  let component: QueryReligionWbComponent;
  let fixture: ComponentFixture<QueryReligionWbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryReligionWbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryReligionWbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
