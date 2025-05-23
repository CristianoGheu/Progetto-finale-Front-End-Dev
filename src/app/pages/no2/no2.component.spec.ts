import { ComponentFixture, TestBed } from '@angular/core/testing';

import { No2Component } from './no2.component';

describe('No2Component', () => {
  let component: No2Component;
  let fixture: ComponentFixture<No2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [No2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(No2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
