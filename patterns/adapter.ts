interface Shape {
    draw(x1: number, y1: number, x2: number, y2: number): void;
}

class LegacyRetangle {
    draw(x: number, y: number, w: number, h: number) {
        console.log(`LegacyRetangle ${JSON.stringify({ x, y, w, h })}`);
    }
}

class Retangle implements Shape {
    draw(x1: number, y1: number, x2: number, y2: number) {
        console.log(`Retangle ${JSON.stringify({ x1, y1, x2, y2 })}`);
    }
}

class RetangleAdapter implements Shape {
    constructor(private readonly retangle: LegacyRetangle) {}

    draw(x1: number, y1: number, x2: number, y2: number) {
        const x = Math.min(x1, x2);
        const y = Math.min(y1, y2);
        const w = Math.abs(x2 - x1);
        const h = Math.abs(y2 - y1);

        this.retangle.draw(x, y, w, h);
    }
}

const coordinates: Parameters<Shape['draw']> = [-2, 1, 4, 3];

const retangles = [new Retangle(), new RetangleAdapter(new LegacyRetangle())];

retangles.forEach(retangle => {
    retangle.draw(...coordinates);
});
