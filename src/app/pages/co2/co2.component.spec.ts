import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co2Component } from './co2.component';

describe('Co2Component', () => {
  let component: Co2Component;
  let fixture: ComponentFixture<Co2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Co2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Co2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
