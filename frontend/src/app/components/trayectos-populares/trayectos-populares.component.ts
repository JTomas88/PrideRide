import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-trayectos-populares',
  standalone: true,
  imports: [IonicModule, MatButton],
  templateUrl: './trayectos-populares.component.html',
  styleUrls: ['./trayectos-populares.component.scss'],
})
export class TrayectosPopularesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
