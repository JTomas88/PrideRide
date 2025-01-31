import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nuevo-viaje-general',
  standalone: true,
  imports: [IonicModule, MatButtonModule, TranslateModule, MatIcon],
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
