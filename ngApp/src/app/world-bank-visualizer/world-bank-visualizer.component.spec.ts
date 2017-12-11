import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldBankVisualizerComponent } from './world-bank-visualizer.component';

describe('WorldBankVisualizerComponent', () => {
  let component: WorldBankVisualizerComponent;
  let fixture: ComponentFixture<WorldBankVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldBankVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldBankVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
