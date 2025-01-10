import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataViajePage } from './data-viaje.page';

describe('DataViajePage', () => {
  let component: DataViajePage;
  let fixture: ComponentFixture<DataViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
