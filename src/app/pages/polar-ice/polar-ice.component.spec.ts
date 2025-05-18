import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarIceComponent } from './polar-ice.component';

describe('PolarIceComponent', () => {
  let component: PolarIceComponent;
  let fixture: ComponentFixture<PolarIceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolarIceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolarIceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
