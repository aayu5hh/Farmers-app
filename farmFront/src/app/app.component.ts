import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
// <<<<<<< HEAD
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   template:`

  
// =======
  template: `
    <router-outlet></router-outlet>
  `,
  styles: ['']
// >>>>>>> 03be79f00ebdf2ef03a208d6fe954053ffac8873
})
export class AppComponent {
  title = 'farmFront';
}
