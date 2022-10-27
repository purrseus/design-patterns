let instance: Counter;
let singletonCount = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!');
    }
    instance = this;
  }

  getCount() {
    return singletonCount;
  }

  increment() {
    singletonCount++;
  }

  decrement() {
    singletonCount--;
  }
}

const counter = new Counter();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getCount());
// const counter2 = new Counter();
// console.log(counter2.getCount());

export {};
