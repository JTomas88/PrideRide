import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IonicModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
