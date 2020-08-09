import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2> {{title}} </h2>
    <router-outlet></router-outlet>
  `,
  styles: ['']
})
export class AppComponent {
  title = 'farmFront';
}
