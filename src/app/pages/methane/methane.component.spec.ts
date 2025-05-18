import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetanoComponent } from './methane.component';

describe('MetanoComponent', () => {
  let component: MetanoComponent;
  let fixture: ComponentFixture<MetanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
