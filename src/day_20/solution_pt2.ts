import {lcmOfList} from '../../src/utils/util';
// Another that isn't great, works for the puzzle input but not for all the examples and needs some data inspection.
//
// Things I notice:
// 1. rx has a single input which is a conjunction of 4 other inputs
// 2. each input to the conjunction is reaced from a subgraph that is one of the paths from broadcaster
// 3. the graph can be thought of like this...
//
//                  + --> [N node subgraph] >-- +
//                  |                           |
//                  + --> [M node subgraph] >-- +
//    Broadcaster +                               + &aa --> rx
//                  + --> [Y node subgraph] >-- +
//                  |                           |
//                  + --> [X node subgraph] >-- +
//
// 4. for the machine to turn on, &aa needs to emit a LOW pulse to rx
// 5. for &aa to emit a low pulse, all subgraphs need to provide it with high pulses.
//
// Given the differing numbers of nodes and their types, will need to work out the cycle size of each subgraph
// and then can use LCM from Day 08 to work out the point where all 4 cycles align
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
  state!: Map<string, Module>;

  constructor(state: Map<string, Module>) {
    this.state = state;
  }

  clone(): State {
    const newMap = new Map<string, Module>();
    this.state.forEach((module, name) => {
      newMap.set(name, module.clone());
    });
    return new State(newMap);
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

export const solve = (target: string, input: Array<string>): number => {
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

  // find the paths to the end so that we can work out
  let shortestPathLength = Number.MAX_SAFE_INTEGER;
  const pathsToTarget: Array<Array<string>> = [];
  for (const broadcasterOutput of modules.get('broadcaster').targets) {
    let path = getPathToTarget(broadcasterOutput, target, modules);
    path = path.reverse();
    pathsToTarget.push(path);
    if (path.length < shortestPathLength) {
      shortestPathLength = path.length;
    }
  }

  // last conjunction
  let lastConjunction = '';
  for (let i = 0; i < shortestPathLength; i++) {
    const dedupe: Set<string> = new Set();
    for (const path of pathsToTarget) {
      dedupe.add(path[i]);
    }
    if (dedupe.size === 1) {
      lastConjunction = dedupe.values().next().value!;
      continue;
    }
    break;
  }

  // Now get a mapping of the output from boardcast to the input of the
  // last conjunction
  const broadcasterToWatchedNode = new Map();
  const conjunctionModule = modules.get(lastConjunction);
  for (const input of conjunctionModule.inputs) {
    for (const path of pathsToTarget) {
      if (path.includes(input)) {
        broadcasterToWatchedNode.set(path[path.length - 1], input);
      }
    }
  }

  const state = new State(modules);
  const pushesToHigh = [];
  for (const [from, to] of broadcasterToWatchedNode) {
    //copy the state
    let iterationState = state.clone();
    const broadcasterModule = iterationState.state.get('broadcaster');
    broadcasterModule!.targets = [from];

    let presses = 0;
    while (!iterationState.state.get(to)!.state) {
      presses++;
      iterationState = simulatePress(
        'broadcaster',
        lastConjunction,
        iterationState
      );
    }
    pushesToHigh.push(presses);
  }

  return lcmOfList(pushesToHigh);
};

const getPathToTarget = (
  startModule: string,
  target: string,
  modules: Map<string, Module>
): Array<string> => {
  const path: Array<string> = [];
  const queue = [{location: startModule, path: [startModule]}];
  const seen = new Set();
  while (queue.length > 0) {
    const module = queue.shift();
    if (module!.location === target) {
      return module!.path;
    }

    if (seen.has(module!.location)) {
      continue;
    }
    seen.add(module!.location);

    for (const nextLocation of modules.get(module!.location)!.targets) {
      const tempPath = [...module!.path];
      tempPath.push(nextLocation);
      queue.push({location: nextLocation, path: tempPath});
    }
  }

  return path;
};

const simulatePress = (
  startModule: string,
  watchedModule: string,
  state: State
): State => {
  const newState: State = state.clone();

  const queue: Array<Step> = [];
  queue.push(new Step(startModule, false));

  while (queue.length > 0) {
    const step = queue.shift();
    if (step!.moduleName === watchedModule && step!.input) {
      return newState;
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
