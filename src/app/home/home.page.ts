import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title: string = '';
  itens: string[] = [];

  constructor() {

  }

  insert() {
    console.log("oi")
  }

  cancel() {
    this.title = '';
  }

}
