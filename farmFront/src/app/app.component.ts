import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template:`
  <app-header>
  <router-outlet>
  <app-footer>`
  
})
export class AppComponent {
  title = 'farmFront';
}
