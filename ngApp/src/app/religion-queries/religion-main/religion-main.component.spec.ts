import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionMainComponent } from './religion-main.component';

describe('ReligionMainComponent', () => {
  let component: ReligionMainComponent;
  let fixture: ComponentFixture<ReligionMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
