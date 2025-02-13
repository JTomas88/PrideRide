import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViajeSeleccionadoComponent } from './viaje-seleccionado.component';

describe('ViajeSeleccionadoComponent', () => {
  let component: ViajeSeleccionadoComponent;
  let fixture: ComponentFixture<ViajeSeleccionadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajeSeleccionadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViajeSeleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
