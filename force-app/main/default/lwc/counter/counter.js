import { LightningElement } from 'lwc';

export default class Counter extends LightningElement {
  counter = 0;

  increment() {
    this.counter++
  }
  increment10x() {
    this.counter+=10;
  }
  decrement() {
    this.counter--;
  }
  reset() {
    this.counter=0;
  }
}