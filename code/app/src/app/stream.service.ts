import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/debounceTime';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';


declare let io: any;

@Injectable()
export class StreamService {
  ping = new BehaviorSubject<boolean>(false);
  tweets: Observable<any[]>;

  constructor(http: Http) {
    let socket = io('http://localhost:3000/');

    socket.on('ping', () => this.ping.next(true));

    this.ping
      .debounceTime(1000)
      .subscribe(x => this.ping.next(false));

    // this.tweets = Observable.create((observer) => {
    //   let tweets = [];
    //   socket.on('tweet', (tweet) => {
    //     tweets.unshift(tweet);

    //     if (tweets.length > 100)
    //       tweets.splice(100);

    //     observer.next(tweets);
    //   });
    // });

    this.tweets = http.get('http://localhost:3000/tweets')
      .mergeMap(response => {
        return Observable.create((observer) => {
          let tweets = response.json() || [];
          observer.next(tweets)
          socket.on('tweet', (tweet) => {
            tweets.unshift(tweet);

            if (tweets.length > 100)
              tweets.splice(100);

            observer.next(tweets);
          });
        });
      });
  }
}
