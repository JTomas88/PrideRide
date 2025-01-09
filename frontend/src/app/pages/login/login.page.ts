import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() { }

  // Verifica si un campo ha sido tocado o tiene un error
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control?.touched && control?.invalid ? true : false;
  }
}
