import { Component } from '@angular/core';
import { APP_IMPORTS, APP_PROVIDERS } from './app-imports';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: APP_IMPORTS,
  templateUrl: './app.component.html',
  providers: APP_PROVIDERS
})
export class AppComponent {
  constructor() { }
}
