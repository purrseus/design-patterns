interface IAnimal {
  sound: string;
  makeSound(): void;
}

abstract class Animal {
  abstract legs: number;

  showLegs() {
    console.log(this.legs);
  }
}

class FourLegsAnimal extends Animal {
  legs = 4;
}

class TwoLegsAnimal extends Animal {
  legs = 2;
}

class Dog extends FourLegsAnimal implements IAnimal {
  sound = 'woof';

  makeSound() {
    console.log(this.sound);
  }
}

class Cat extends FourLegsAnimal implements IAnimal {
  sound = 'meow';

  makeSound() {
    console.log(this.sound);
  }
}

class Duck extends TwoLegsAnimal implements IAnimal {
  sound = 'quack';

  makeSound() {
    console.log(this.sound);
  }
}

class Chicken extends TwoLegsAnimal implements IAnimal {
  sound = 'cluck';

  makeSound() {
    console.log(this.sound);
  }
}

abstract class AbstractAnimalFactory {
  abstract createAnimal(): Animal;
}

class FourLegsAnimalFactory extends AbstractAnimalFactory {
  createAnimal() {
    return new (Math.random() < 0.5 ? Dog : Cat)();
  }
}

class TwoLegsAnimalFactory extends AbstractAnimalFactory {
  createAnimal() {
    return new (Math.random() < 0.5 ? Duck : Chicken)();
  }
}

const animalFactory = new (
  Math.random() < 0.5 ? FourLegsAnimalFactory : TwoLegsAnimalFactory
)();

for (let i = 0; i <= 10; i++) {
  const animal = animalFactory.createAnimal();
  animal.makeSound();
  // animal.showLegs();
}

export {};
