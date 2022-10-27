interface Command {
  execute(): void;
  undo(): void;
}

interface Receiver {
  turnOnAction(): void;
  turnOffAction(): void;
}

class Remote {
  constructor(
    private readonly turnOnCommand: Command,
    private readonly turnOffCommand: Command,
  ) {}

  turnOnButtonClick() {
    this.turnOnCommand.execute();
  }

  turnOffButtonClick() {
    this.turnOffCommand.execute();
  }
}

class AirCondition implements Receiver {
  turnOnAction() {
    console.log('Turn on!');
  }

  turnOffAction() {
    console.log('tTurn off!');
  }
}

class TurnOnCommand implements Command {
  constructor(private readonly receiver: Receiver) {}

  execute() {
    this.receiver.turnOnAction();
  }

  undo() {
    this.receiver.turnOffAction();
  }
}

class TurnOffCommand implements Command {
  constructor(private readonly receiver: Receiver) {}

  execute() {
    this.receiver.turnOffAction();
  }

  undo() {
    this.receiver.turnOnAction();
  }
}

const airCondition = new AirCondition();

const turnOnCommand = new TurnOnCommand(airCondition);
const turnOffCommand = new TurnOffCommand(airCondition);

const remote = new Remote(turnOnCommand, turnOffCommand);

remote.turnOnButtonClick();
remote.turnOffButtonClick();

export {};
