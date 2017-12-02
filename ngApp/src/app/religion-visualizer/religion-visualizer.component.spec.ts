import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionVisualizerComponent } from './religion-visualizer.component';

describe('ReligionVisualizerComponent', () => {
  let component: ReligionVisualizerComponent;
  let fixture: ComponentFixture<ReligionVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
