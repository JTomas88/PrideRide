import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosContactoPage } from './datos-contacto.page';

describe('DatosContactoPage', () => {
  let component: DatosContactoPage;
  let fixture: ComponentFixture<DatosContactoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosContactoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
