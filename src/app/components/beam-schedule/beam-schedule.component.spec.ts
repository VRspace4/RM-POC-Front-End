import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamScheduleComponent } from './beam-schedule.component';

describe('BeamScheduleComponent', () => {
  let component: BeamScheduleComponent;
  let fixture: ComponentFixture<BeamScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeamScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
