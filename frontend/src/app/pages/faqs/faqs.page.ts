import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatIconModule, 
    IonicModule, 
    MatButtonModule, 
    RouterModule, 
    MatDivider, 
    JumbotronComponent
  ]
})
export class FaqsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
