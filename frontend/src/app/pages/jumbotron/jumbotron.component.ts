import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
})
export class JumbotronComponent  implements OnInit {

  cabeceraIMG = '../../../assets/folder/jumbo.jpg';
  constructor() { }

  ngOnInit() {}

}
