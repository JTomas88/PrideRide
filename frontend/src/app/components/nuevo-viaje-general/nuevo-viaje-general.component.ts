import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-nuevo-viaje-general',
  standalone: true,
  imports: [IonicModule, MatButtonModule],
  templateUrl: './nuevo-viaje-general.component.html',
  styleUrls: ['./nuevo-viaje-general.component.scss'],
})
export class NuevoViajeGeneralComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }


  openNewTravel() {
    this.router.navigate(['/nuevo-viaje'], {});
  }
}
