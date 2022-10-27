interface Phone {
  getCost(): number;
}

class SmartPhone implements Phone {
  getCost() {
    return 599;
  }
}

abstract class PhoneDecorator implements Phone {
  protected abstract cost: number;
  constructor(private readonly inner: Phone) {}

  getCost() {
    return this.cost + this.inner.getCost();
  }
}

class ChargeAdapter extends PhoneDecorator {
  protected cost = 100;
}

class ChargeCable extends PhoneDecorator {
  protected cost = 50;
}

class SkinWrap extends PhoneDecorator {
  protected cost = 80;
}

class ScreenProtector extends PhoneDecorator {
  protected cost = 120;
}

class InEarHeadphone extends PhoneDecorator {
  protected cost = 45;
}

const smartPhone = new ChargeAdapter(
  new ChargeCable(
    new SkinWrap(new ScreenProtector(new InEarHeadphone(new SmartPhone()))),
  ),
);

console.log(smartPhone.getCost());

export {};
