import { Component } from '@angular/core';
import { UsersModule } from './users/users.module';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: ['']
})
export class AppComponent {

  title = 'farmFront';
}
