import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StreamService } from './stream.service';

declare let Masonry: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(public stream: StreamService) { }

  ngOnInit() {
    var masonry = new Masonry('app-root', {
      itemSelector: '.EmbeddedTweet'
    });

    this.stream.tweets.debounceTime(1).subscribe(x => {
      masonry.reloadItems();
      masonry.layout();
    });
  }
}
