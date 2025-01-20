import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaldoTransferenciasPage } from './saldo-transferencias.page';

describe('SaldoTransferenciasPage', () => {
  let component: SaldoTransferenciasPage;
  let fixture: ComponentFixture<SaldoTransferenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoTransferenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
