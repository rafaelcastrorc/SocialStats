import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartOfComponent } from './part-of.component';

describe('PartOfComponent', () => {
  let component: PartOfComponent;
  let fixture: ComponentFixture<PartOfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartOfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
