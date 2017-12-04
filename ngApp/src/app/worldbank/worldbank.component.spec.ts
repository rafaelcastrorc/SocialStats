import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldbankComponent } from './worldbank.component';

describe('WorldbankComponent', () => {
  let component: WorldbankComponent;
  let fixture: ComponentFixture<WorldbankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldbankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
