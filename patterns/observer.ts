class Observer {
  constructor(public name: string, private readonly subject: Subject) {
    this.subject.attachObserver(this);
  }

  notify(obj: Record<string, any>) {
    console.log(`${this.name}: ${JSON.stringify(obj)}`);
  }
}

class Subject {
  observers: Observer[] = [];

  attachObserver(observer: Observer) {
    const isObserverExisted = this.observers.some(
      (observerItem) => observerItem.name === observer.name,
    );
    if (isObserverExisted) {
      console.log('This observer already exists!');
      return;
    }
    this.observers.push(observer);
  }

  detachObserver(observer: Observer) {
    this.observers = this.observers.filter(
      (observerItem) => observerItem.name !== observer.name,
    );
  }

  protected notifyObserver(obj: Record<string, any>) {
    this.observers.forEach((observer) => {
      observer.notify(obj);
    });
  }
}

class PostData extends Subject {
  constructor(
    private _title: string,
    private _description: string,
    private _image: string,
  ) {
    super();
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
    this.onPostChanged();
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
    this.onPostChanged();
  }

  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
    this.onPostChanged();
  }

  onPostChanged() {
    this.notifyObserver({
      title: this._title,
      description: this._description,
      image: this._image,
    });
  }
}

const postData = new PostData(
  'This is a title',
  'This is a description',
  'This is a image',
);

const pushNotificationObserver = new Observer(
  'PushNotificationObserver',
  postData,
);
const emailObserver = new Observer('EmailObserver', postData);
const smsObserver = new Observer('SMSObserver', postData);

const keys: (keyof Pick<PostData, 'title' | 'description' | 'image'>)[] = [
  'title',
  'description',
  'image',
];
let observerCount = 0;

const handleSubscription: Record<number, () => void> = {
  5: () => postData.detachObserver(emailObserver),
  10: () => postData.detachObserver(smsObserver),
  15: () => postData.attachObserver(emailObserver),
};

const interval = setInterval(() => {
  if (observerCount > 20) {
    clearInterval(interval);
    return;
  }

  handleSubscription[observerCount]?.();

  const random = Math.floor(Math.random() * 3);
  postData[keys[random]] = observerCount.toString();
  observerCount++;
}, 1000);

export {};
