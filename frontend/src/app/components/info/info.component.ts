import { Component, OnInit } from '@angular/core';
import { IonGrid } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [IonicModule, TranslateModule],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
