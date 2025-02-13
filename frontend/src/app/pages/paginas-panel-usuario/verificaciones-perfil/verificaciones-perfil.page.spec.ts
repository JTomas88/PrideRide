import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificacionesPerfilPage } from './verificaciones-perfil.page';

describe('VerificacionesPerfilPage', () => {
  let component: VerificacionesPerfilPage;
  let fixture: ComponentFixture<VerificacionesPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionesPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
