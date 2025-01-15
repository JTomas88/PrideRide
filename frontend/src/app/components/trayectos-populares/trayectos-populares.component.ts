import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-trayectos-populares',
  standalone: true,
  imports: [IonicModule, MatButton, TranslateModule],
  templateUrl: './trayectos-populares.component.html',
  styleUrls: ['./trayectos-populares.component.scss'],
})
export class TrayectosPopularesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
