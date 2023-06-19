import { Component, OnInit } from '@angular/core';
import { Observable, from, fromEvent, interval, of } from 'rxjs';
import { distinctUntilChanged, filter, map, take, scan, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-observable',
  templateUrl: './rxjs-observable.component.html',
  styleUrls: ['./rxjs-observable.component.scss']
})
export class RxjsObservableComponent implements OnInit {

  // mainObservableStream: Observable<any> = new Observable;
  data: number = -1;

  constructor() { }

  ngOnInit() {
    let mainObservableStream = new Observable(this.asyncStream);
    let subscribe = mainObservableStream.pipe(
      map((x: any) => Math.round(x)),
      // filter(x => x > 5),
      // take(1),
      // distinctUntilChanged(),
    ).subscribe(res => this.listner(res));

    setTimeout(() => {
      subscribe.unsubscribe();
    }, 10000);
  }

  asyncStream(observer: any) {
    const interval = setInterval(() => {
      observer.next(Math.random() * 10);
    }, 1000);

    return () => clearInterval(interval);
  }

  listner(data: any) {
    this.data = data;
    console.log('data', data);
  }
}

// const observable = new Observable((subscriber) => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.next(3);
//   setTimeout(() => {
//     subscriber.next(4);
//     subscriber.complete();
//   }, 1000);
//   setInterval(() => {
//     subscriber.error("Error occured.");
//   }, 4000);
// });

// console.log('just before subscribe');
// observable.subscribe({
//   next(x) {
//     console.log('got value ' + x);
//   },
//   error(err) {
//     console.error('something wrong occurred: ' + err);
//   },
//   complete() {
//     console.log('done');
//   },
// });
// console.log('just after subscribe');

// Example 1: Mapping values
// let numbers = [1, 2, 3, 4, 5];
// let numbersObservable = from(numbers);
// numbersObservable.pipe(
//   map(value => value * 2)
// ).subscribe(result => console.log(result));
// Output: 2, 4, 6, 8, 10

// Example 2: Filtering values
// let sourceObservable = from([1, 2, 3, 4, 5]);
// sourceObservable.pipe(
//   filter(value => value % 2 === 0)
// ).subscribe(result => console.log(result));
// Output: 2, 4

// Example 3: Taking a specific number of values
// let intervalObservable = interval(1000);
// intervalObservable.pipe(
//   take(5)
// ).subscribe(result => console.log(result));
// Output: 0, 1, 2, 3, 4

//emit string as a sequence
// const source = from('Hello World');
// //output: 'H','e','l','l','o',' ','W','o','r','l','d'
// const subscribeSource = source.subscribe(val => console.log(val));

// of(1, 2, 3)
// .pipe(map((x) => x * x))
// .subscribe((v) => console.log(`value: ${v}`));


// fromEvent(document, 'click')
// .pipe(
//   throttleTime(1000),
//   map((event: any) => event.clientX),
//   scan((count, clientX) => count + clientX, 0)
// )
// .subscribe((count) => console.log(count));

// fromEvent(document, 'click')
//   .pipe(
//     throttleTime(1000),
//     scan((count) => count + 1, 0)
//   )
//   .subscribe((count) => console.log(`Clicked ${count} times`));

// fromEvent(document, 'click')
// .pipe(scan((count) => count + 1, 0))
// .subscribe((count) => console.log(`Clicked ${count} times`));

// fromEvent(document, 'click').subscribe((event) => {
//   console.log('Clicked!')
//   console.log('event', event)
// });