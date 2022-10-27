class Monitor {}
class ComputerCase {}
class Keyboard {}
class Mouse {}
class Ram {}
class Cpu {}
class GraphicCard {}

interface IPersonalComputer {
  monitor: Monitor;
  computerCase: ComputerCase;
  keyboard: Keyboard;
  mouse: Mouse;
  ram: Ram;
  cpu: Cpu;
  graphicCard: GraphicCard;
}

interface IPersonalComputerBuilder {
  addMonitor(monitor: Monitor): this;
  addComputerCase(computerCase: ComputerCase): this;
  addKeyboard(keyboard: Keyboard): this;
  addMouse(mouse: Mouse): this;
  addRam(ram: Ram): this;
  addCpu(cpu: Cpu): this;
  addGraphicCard(graphicCard: GraphicCard): this;
  build(): IPersonalComputer;
}

class PersonalComputer implements IPersonalComputer {
  constructor(
    public monitor: Monitor,
    public computerCase: ComputerCase,
    public keyboard: Keyboard,
    public mouse: Mouse,
    public ram: Ram,
    public cpu: Cpu,
    public graphicCard: GraphicCard,
  ) {}
}

class PersonalComputerBuilder
  implements IPersonalComputerBuilder, Partial<IPersonalComputer>
{
  monitor?: Monitor;
  computerCase?: ComputerCase;
  keyboard?: Keyboard;
  mouse?: Mouse;
  ram?: Ram;
  cpu?: Cpu;
  graphicCard?: GraphicCard;

  addMonitor(monitor: Monitor) {
    this.monitor = monitor;
    return this;
  }

  addComputerCase(computerCase: ComputerCase) {
    this.computerCase = computerCase;
    return this;
  }

  addKeyboard(keyboard: Keyboard) {
    this.keyboard = keyboard;
    return this;
  }

  addMouse(mouse: Mouse) {
    this.mouse = mouse;
    return this;
  }

  addRam(ram: Ram) {
    this.ram = ram;
    return this;
  }

  addCpu(cpu: Cpu) {
    this.cpu = cpu;
    return this;
  }

  addGraphicCard(graphicCard: GraphicCard) {
    this.graphicCard = graphicCard;
    return this;
  }

  build() {
    return new PersonalComputer(
      this.monitor!,
      this.computerCase!,
      this.keyboard!,
      this.mouse!,
      this.ram!,
      this.cpu!,
      this.graphicCard!,
    );
  }
}

const personalComputer = new PersonalComputerBuilder()
  .addMonitor(new Monitor())
  .addComputerCase(new ComputerCase())
  .addKeyboard(new Keyboard())
  .addMouse(new Mouse())
  .addRam(new Ram())
  .addCpu(new Cpu())
  .addGraphicCard(new GraphicCard())
  .build();

console.log(personalComputer);

export {};
