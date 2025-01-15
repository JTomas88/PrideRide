import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjustesCuentaPage } from './ajustes-cuenta.page';

describe('AjustesCuentaPage', () => {
  let component: AjustesCuentaPage;
  let fixture: ComponentFixture<AjustesCuentaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesCuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
