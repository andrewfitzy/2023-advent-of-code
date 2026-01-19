enum ModuleType {
  FLIP_FLOP = '%',
  CONJUNCTION = '&',
  NONE = '',
}

class Module {
  type!: ModuleType;
  name!: string;
  state!: boolean;
  inputs!: Array<string>;
  targets!: Array<string>;

  constructor(input: string) {
    const [module, targetsList] = input.split('->').map(x => x.trim());

    if (
      module.startsWith(ModuleType.FLIP_FLOP) ||
      module.startsWith(ModuleType.CONJUNCTION)
    ) {
      this.type =
        module.charAt(0) === ModuleType.FLIP_FLOP
          ? ModuleType.FLIP_FLOP
          : ModuleType.CONJUNCTION;
      this.name = module.substring(1);
    } else {
      this.type = ModuleType.NONE;
      this.name = module;
    }
    this.state = false;
    this.inputs = [];
    this.targets = targetsList.split(',').map(x => x.trim());
  }

  clone(): Module {
    // We don't want to re-parse the string, so we manually copy properties
    const copy = Object.create(Module.prototype);
    Object.assign(copy, this);
    copy.inputs = [...this.inputs];
    copy.targets = [...this.targets];
    return copy;
  }
}

class State {
  highPulses!: number;
  lowPulses!: number;
  state!: Map<string, Module>;

  constructor(
    highPulses: number,
    lowPulses: number,
    state: Map<string, Module>
  ) {
    this.highPulses = highPulses;
    this.lowPulses = lowPulses;
    this.state = state;
  }

  clone(): State {
    const newMap = new Map<string, Module>();
    this.state.forEach((module, name) => {
      newMap.set(name, module.clone());
    });
    return new State(this.highPulses, this.lowPulses, newMap);
  }
}

class Step {
  moduleName!: string;
  input!: boolean;

  constructor(moduleName: string, input: boolean) {
    this.moduleName = moduleName;
    this.input = input;
  }
}

export const solve = (presses: number, input: Array<string>): number => {
  const modules = new Map();
  for (const index of input) {
    const module = new Module(index);
    modules.set(module.name, module);
  }

  for (const module of modules.values()) {
    for (const target of module.targets) {
      if (modules.has(target)) {
        const targetModule = modules.get(target);
        targetModule.inputs.push(module.name);
      }
    }
  }

  let state = new State(0, 0, modules);
  for (let i = 0; i < presses; i++) {
    state = simulatePress('broadcaster', state);
  }

  const total = state.lowPulses * state.highPulses;
  return total;
};

const simulatePress = (startModule: string, state: State): State => {
  const newState: State = state.clone();

  const queue: Array<Step> = [];
  queue.push(new Step(startModule, false));

  while (queue.length > 0) {
    const step = queue.shift();
    if (step!.input) {
      newState.highPulses = newState.highPulses + 1;
    } else {
      newState.lowPulses = newState.lowPulses + 1;
    }

    if (!newState.state.has(step!.moduleName)) {
      // might have a leaf node
      continue;
    }

    const module = newState.state.get(step!.moduleName);

    //There is a single broadcast module (named broadcaster). When it receives a pulse, it sends the same pulse to all of its destination modules.
    if (module!.type === ModuleType.NONE) {
      for (const targetName of module!.targets) {
        queue.push(new Step(targetName, step!.input));
      }
    }

    if (module!.type === ModuleType.FLIP_FLOP) {
      if (!step!.input) {
        //If a flip-flop module receives a low pulse, it flips between on and off. If it was off, it turns on and sends a high pulse. If it was on, it turns off and sends a low pulse.
        module!.state = !module!.state ? true : false;
        const output = module!.state ? true : false;
        for (const targetName of module!.targets) {
          queue.push(new Step(targetName, output));
        }
      }
      //If a flip-flop module receives a high pulse, it is ignored and nothing happens.
    }

    if (module!.type === ModuleType.CONJUNCTION) {
      let allHigh = true;
      for (const input of module!.inputs) {
        allHigh = allHigh && newState.state.get(input)!.state;
      }
      //if it remembers high pulses for all inputs, it sends a low pulse; otherwise, it sends a high pulse.
      const output = allHigh ? false : true;
      module!.state = output;
      for (const targetName of module!.targets) {
        queue.push(new Step(targetName, output));
      }
    }
  }
  return newState;
};
