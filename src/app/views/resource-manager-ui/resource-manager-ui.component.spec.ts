import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceManagerUiComponent } from './resource-manager-ui.component';

describe('ResourceManagerUiComponent', () => {
  let component: ResourceManagerUiComponent;
  let fixture: ComponentFixture<ResourceManagerUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceManagerUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceManagerUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
