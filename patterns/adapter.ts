interface Shape {
  draw(x1: number, y1: number, x2: number, y2: number): void;
}

class LegacyRectangle {
  draw(x: number, y: number, w: number, h: number) {
    console.log(`LegacyRectangle ${JSON.stringify({ x, y, w, h })}`);
  }
}

class Rectangle implements Shape {
  draw(x1: number, y1: number, x2: number, y2: number) {
    console.log(`Rectangle ${JSON.stringify({ x1, y1, x2, y2 })}`);
  }
}

class RectangleAdapter implements Shape {
  constructor(private readonly rectangle: LegacyRectangle) {}

  draw(x1: number, y1: number, x2: number, y2: number) {
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const w = Math.abs(x2 - x1);
    const h = Math.abs(y2 - y1);

    this.rectangle.draw(x, y, w, h);
  }
}

const coordinates: Parameters<Shape['draw']> = [-2, 1, 4, 3];

const rectangles = [
  new Rectangle(),
  new RectangleAdapter(new LegacyRectangle()),
];

rectangles.forEach((rectangle) => {
  rectangle.draw(...coordinates);
});

export {};
