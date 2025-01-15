import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { IonicModule, IonModal } from '@ionic/angular';
import { AnimationController } from '@ionic/angular/standalone';


@Component({
  selector: 'app-terminos',
  standalone: true,
  imports: [  
    MatDialogContent,
    MatDividerModule,
    MatButtonModule,
    MatIcon,
    IonicModule
  ],
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.scss'],
})
export class TerminosComponent  implements OnInit {
  @ViewChild('terminosModal', { static: true }) terminosModal!: IonModal;
  constructor(private dialogRef: MatDialogRef<TerminosComponent>, private animationCtrl: AnimationController) { }

  ngOnInit() {
    const enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;

      const backdropElement = root?.querySelector('ion-backdrop');
      const wrapperElement = root?.querySelector('.modal-wrapper');

      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(backdropElement || baseEl)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl.create();

      if (wrapperElement) {
        wrapperAnimation.addElement(wrapperElement).keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);
      }

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: HTMLElement) => {
      return enterAnimation(baseEl).direction('reverse');
    };

    this.terminosModal.enterAnimation = enterAnimation;
    this.terminosModal.leaveAnimation = leaveAnimation;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
