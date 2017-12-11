import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldBankComponent } from './world-bank.component';
import {WorldBankService} from '../world-bank.service';

describe('WorldBankComponent', () => {
  let component: WorldBankComponent;
  let fixture: ComponentFixture<WorldBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
