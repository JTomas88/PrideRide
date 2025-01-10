import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoViajePage } from './nuevo-viaje.page';

describe('NuevoViajePage', () => {
  let component: NuevoViajePage;
  let fixture: ComponentFixture<NuevoViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
