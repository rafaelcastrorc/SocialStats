import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossTableVisualizerComponent } from './cross-table-visualizer.component';

describe('CrossTableVisualizerComponent', () => {
  let component: CrossTableVisualizerComponent;
  let fixture: ComponentFixture<CrossTableVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossTableVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossTableVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
