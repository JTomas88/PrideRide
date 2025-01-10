import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.page.html',
  styleUrls: ['./nuevo-viaje.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, IonicModule, MatButtonModule, RouterModule]
})
export class NuevoViajePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goTo() {
    this.router.navigate(['/data-viaje'], {});
  }

}
