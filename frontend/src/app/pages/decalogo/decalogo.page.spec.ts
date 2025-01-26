import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DecalogoPage } from './decalogo.page';

describe('DecalogoPage', () => {
  let component: DecalogoPage;
  let fixture: ComponentFixture<DecalogoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DecalogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
