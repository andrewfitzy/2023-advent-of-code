class Range {
  low!: number;
  high!: number;

  constructor(low: number, high: number) {
    this.low = low;
    this.high = high;
  }
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
}

export const solve = (input: Array<string>): number => {
  const workflows: Map<string, Workflow> = new Map();
  for (const index of input) {
    if (index.trim().length === 0) {
      break;
    }

    const tmpWorkflow = new Workflow(index);
    workflows.set(tmpWorkflow.identifier, tmpWorkflow);
  }

  const partRanges: Map<string, Range> = new Map();
  partRanges.set('x', new Range(1, 4000));
  partRanges.set('m', new Range(1, 4000));
  partRanges.set('a', new Range(1, 4000));
  partRanges.set('s', new Range(1, 4000));

  const total = countAcceptableParts('in', partRanges, workflows);

  return total;
};

const countAcceptableParts = (
  workflowId: string,
  partRanges: Map<string, Range>,
  workflows: Map<string, Workflow>
): number => {
  if (workflowId === 'R') {
    return 0;
  }

  if (workflowId === 'A') {
    // reached an accpetable state, multiply the sizes of each range for x, m, a and s
    let acceptableParts = 1;
    for (const range of partRanges.values()) {
      acceptableParts = acceptableParts * (range.high - range.low + 1);
    }
    return acceptableParts;
  }

  const rules = workflows.get(workflowId)!.rules;

  let processDefault = true;
  let acceptableParts = 0;
  for (const rule of rules) {
    // get range for x, m ,a or s
    const range = partRanges.get(rule.partAttribute);
    let trueEvalulationRange;
    let falseEvalulationRange;
    if (rule.comparator === '<') {
      // if evaluation is x < 32,
      // 1..31 will evaluate true
      trueEvalulationRange = new Range(
        range!.low,
        Math.min(rule.value - 1, range!.high)
      );
      // 32..4000 will be false
      falseEvalulationRange = new Range(
        Math.max(rule.value, range!.low),
        range!.high
      );
    } else {
      // will be a > comparison
      // if evaluation is x > 32,
      // 33..4000 will evaluate true
      trueEvalulationRange = new Range(
        Math.max(rule.value + 1, range!.low),
        range!.high
      );
      // 1..32 will evaluate false
      falseEvalulationRange = new Range(
        range!.low,
        Math.min(rule.value, range!.high)
      );
    }

    if (trueEvalulationRange.low <= trueEvalulationRange.high) {
      const partRangesCopy = new Map(partRanges);
      partRangesCopy.set(rule.partAttribute, trueEvalulationRange);
      acceptableParts =
        acceptableParts +
        countAcceptableParts(rule.result, partRangesCopy, workflows);
    }
    if (falseEvalulationRange.low <= falseEvalulationRange.high) {
      partRanges = new Map(partRanges);
      partRanges.set(rule.partAttribute, falseEvalulationRange);
    } else {
      // set a value to check if we need to do the fallback
      processDefault = false;
      break;
    }
  }
  if (processDefault) {
    const defaultResult = workflows.get(workflowId)!.defaultResult;
    acceptableParts =
      acceptableParts +
      countAcceptableParts(defaultResult, partRanges, workflows);
  }

  return acceptableParts;
};
