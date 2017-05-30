import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare let io: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor() {
    let socket = io('http://localhost:3000/');
    socket.on('ping', (ping) => console.log(ping));
  }
}
