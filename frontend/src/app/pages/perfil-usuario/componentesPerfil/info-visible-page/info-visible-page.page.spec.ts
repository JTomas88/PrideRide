import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoVisiblePagePage } from './info-visible-page.page';

describe('InfoVisiblePagePage', () => {
  let component: InfoVisiblePagePage;
  let fixture: ComponentFixture<InfoVisiblePagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoVisiblePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
