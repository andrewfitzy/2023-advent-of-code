class Part {
  //{x=787,m=2655,a=1222,s=2876}
  x!: number; //Extremely cool looking
  m!: number; //Musical (it makes a noise when you hit it)
  a!: number; //Aerodynamic
  s!: number; //Shiny
  constructor(input: string) {
    const attributes = input.replace(/[{}]/gi, '').trim().split(',');
    for (const attribute of attributes) {
      const [id, value] = attribute.split('=');
      switch (id) {
        case 'x':
          this.x = parseInt(value);
          break;
        case 'm':
          this.m = parseInt(value);
          break;
        case 'a':
          this.a = parseInt(value);
          break;
        case 's':
          this.s = parseInt(value);
          break;
      }
    }
  }

  public getValue = (attribute: string): number => {
    switch (attribute) {
      case 'x':
        return this.x;
      case 'm':
        return this.m;
      case 'a':
        return this.a;
      case 's':
        return this.s;
      default:
        throw Error('Unknown attribute');
    }
  };

  public getRating = (): number => {
    return this.x + this.m + this.a + this.s;
  };
}

class Workflow {
  //px{a<2006:qkq,m>2090:A,rfg}
  identifier!: string;
  rules: Rule[] = [];
  defaultResult!: string;
  constructor(input: string) {
    const tmpParts = input.split('{');
    this.identifier = tmpParts[0];
    const ruleParts = tmpParts[1].replace(/[{}]/gi, '').trim().split(',');
    this.defaultResult = ruleParts[ruleParts.length - 1];
    ruleParts.pop();
    for (const rule of ruleParts) {
      this.rules.push(new Rule(rule));
    }
  }

  public applyWorkflow = (part: Part): string => {
    let outcome = '';
    for (const rule of this.rules) {
      outcome = rule.applyRule(part);
      if (outcome.length > 0) {
        break;
      }
    }
    return outcome.length > 0 ? outcome : this.defaultResult;
  };
}

class Rule {
  //a<2006:qkq
  partAttribute!: string;
  comparator!: string;
  value: number;
  result: string;
  constructor(input: string) {
    this.comparator = input.indexOf('>') > -1 ? '>' : '<';
    let tmpParts = input.split(/[<>]/);
    this.partAttribute = tmpParts[0];
    tmpParts = tmpParts[1].split(/[:]/);
    this.value = parseInt(tmpParts[0]);
    this.result = tmpParts[1];
  }

  public applyRule = (part: Part): string => {
    let outcome = '';
    const valueForComparison = part.getValue(this.partAttribute);
    if (this.comparator === '>') {
      outcome = valueForComparison > this.value ? this.result : '';
    }
    if (this.comparator === '<') {
      outcome = valueForComparison < this.value ? this.result : '';
    }
    return outcome;
  };
}

export const solve = (input: Array<string>): number => {
  const workflows: Map<string, Workflow> = new Map();
  let partsStart = 0;
  for (const index of input) {
    partsStart = partsStart + 1;
    if (index.trim().length === 0) {
      break;
    }

    const tmpWorkflow = new Workflow(index);
    workflows.set(tmpWorkflow.identifier, tmpWorkflow);
  }

  const partsList: Part[] = [];
  for (let partsIndex = partsStart; partsIndex < input.length; partsIndex++) {
    const part = new Part(input[partsIndex]);
    partsList.push(part);
  }

  const acceptList = [];
  for (const part of partsList) {
    const outcome = processPart(part, workflows);
    if (outcome === 'A') {
      acceptList.push(part);
    }
  }

  let total = 0;
  for (const part of acceptList) {
    total = total + part.getRating();
  }

  return total;
};

export const processPart = (
  part: Part,
  workflows: Map<string, Workflow>
): string => {
  let result = 'in';
  while (result !== 'R' && result !== 'A') {
    const workflow = workflows.get(result);
    result = workflow!.applyWorkflow(part);
  }
  return result;
};
