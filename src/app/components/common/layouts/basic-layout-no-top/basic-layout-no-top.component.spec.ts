import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLayoutNoTopComponent } from './basic-layout-no-top.component';

describe('BasicLayoutNoTopComponent', () => {
  let component: BasicLayoutNoTopComponent;
  let fixture: ComponentFixture<BasicLayoutNoTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicLayoutNoTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLayoutNoTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
