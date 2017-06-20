import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmFullComponent } from './rm-full.component';

describe('RmFullComponent', () => {
  let component: RmFullComponent;
  let fixture: ComponentFixture<RmFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
