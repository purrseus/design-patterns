abstract class Animal {
  abstract hasFourLegs: boolean;
  abstract sound: string;

  makeSound() {
    console.log(this.sound);
  }

  showLegs() {
    console.log(this.hasFourLegs ? 4 : 2);
  }
}

class Dog extends Animal {
  hasFourLegs = true;
  sound = "woof";
}

class Cat extends Animal {
  hasFourLegs = true;
  sound = "meow";
}

class Duck extends Animal {
  hasFourLegs = false;
  sound = "quack";
}

class Chicken extends Animal {
  hasFourLegs = false;
  sound = "cluck";
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

class RandomAnimalFactory implements AnimalFactory {
  createAnimal() {
    const random = Math.ceil(Math.random() * 4) as 1 | 2 | 3 | 4;
    switch (random) {
      case 1:
        return new Dog();
      case 2:
        return new Cat();
      case 3:
        return new Duck();
      case 4:
        return new Chicken();
    }
  }
}

const animalFactory = new (
  Math.random() < 0.5 ? SequenceAnimalFactory : RandomAnimalFactory
)();

for (let i = 0; i <= 10; i++) {
  const animal = animalFactory.createAnimal();
  animal.makeSound();
  animal.showLegs();
}
