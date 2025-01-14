import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
})
export class JumbotronComponent  implements OnInit {

  cabeceraIMG = '../../../assets/folder/jumbo.jpg';
  constructor() { }

  ngOnInit() {}

}
