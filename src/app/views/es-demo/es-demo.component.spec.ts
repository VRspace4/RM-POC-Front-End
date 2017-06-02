import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsDemoComponent } from './es-demo.component';

describe('EsDemoComponent', () => {
  let component: EsDemoComponent;
  let fixture: ComponentFixture<EsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
