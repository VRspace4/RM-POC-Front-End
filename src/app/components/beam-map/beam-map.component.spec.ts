import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamMapComponent } from './beam-map.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('BeamMapComponent', () => {
  let component: BeamMapComponent;
  let fixture: ComponentFixture<BeamMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeamMapComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
