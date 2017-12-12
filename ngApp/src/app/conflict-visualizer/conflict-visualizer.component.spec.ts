import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictVisualizerComponent } from './conflict-visualizer.component';

describe('ConflictVisualizerComponent', () => {
  let component: ConflictVisualizerComponent;
  let fixture: ComponentFixture<ConflictVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConflictVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConflictVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
