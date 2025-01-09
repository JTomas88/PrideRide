import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaViajesPage } from './busqueda-viajes.page';

describe('BusquedaViajesPage', () => {
  let component: BusquedaViajesPage;
  let fixture: ComponentFixture<BusquedaViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
