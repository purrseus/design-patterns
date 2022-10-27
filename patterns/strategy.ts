abstract class PromoteStrategy {
  abstract discount: number;

  doDiscount(price: number) {
    return price * this.discount;
  }
}

class NoDiscountPromoteStrategy extends PromoteStrategy {
  discount = 1;
}

class QuarterPromoteStrategy extends PromoteStrategy {
  discount = 0.75;
}

class HalfPromoteStrategy extends PromoteStrategy {
  discount = 0.5;
}

class Ticket {
  constructor(
    public price: number,
    private readonly promoteStrategy: PromoteStrategy,
    public name: string,
  ) {}

  getPromotedPrice() {
    return this.promoteStrategy.doDiscount(this.price);
  }

  showTicketDetails() {
    console.log(
      `Price of ${this.name} is ${
        this.price
      }. Promoted price is ${this.getPromotedPrice()}`,
    );
  }
}

new Ticket(
  1000,
  new NoDiscountPromoteStrategy(),
  'No Discount Ticket',
).showTicketDetails();

new Ticket(
  2000,
  new QuarterPromoteStrategy(),
  'Quarter Ticket',
).showTicketDetails();

new Ticket(3000, new HalfPromoteStrategy(), 'Half Ticket').showTicketDetails();

export {};
