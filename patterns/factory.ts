abstract class Animal {
  abstract sound: string;

  makeSound() {
    console.log(this.sound);
  }
}

class Dog extends Animal {
  sound = 'woof';
}

class Cat extends Animal {
  sound = 'meow';
}

class Duck extends Animal {
  sound = 'quack';
}

class Chicken extends Animal {
  sound = 'cluck';
}

interface AnimalFactory {
  createAnimal(): Animal;
}

class SequenceAnimalFactory implements AnimalFactory {
  #index = 0;

  createAnimal() {
    switch (this.#index) {
      case 0:
        this.#index++;
        return new Dog();
      case 1:
        this.#index++;
        return new Cat();
      case 2:
        this.#index++;
        return new Duck();
      case 3:
        this.#index = 0;
        return new Chicken();
      default:
        throw new Error();
    }
  }
}

const animalFactory = new SequenceAnimalFactory();

const animal = animalFactory.createAnimal();
animal.makeSound();

export {};
