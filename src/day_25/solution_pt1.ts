export class Step {
  component: string;
  path: Array<string>;

  constructor(component: string, path: Array<string>) {
    this.component = component;
    this.path = path;
  }

  public getHash(): string {
    return `${this.component}-->${this.path.join(',')}`;
  }
}

export const solve = (input: Array<string>): number => {
  // Build a map from the input to represent the edges
  const networkMap = new Map();
  for (const index of input) {
    const [fromComponent, toComponentsStr] = index.split(':');
    const toComponents = toComponentsStr.split(' ').filter(x => x.length > 0);

    // First map from -> to
    const connections = networkMap.get(fromComponent) || [];
    connections.push(...toComponents);
    networkMap.set(fromComponent, connections);

    // Second map all the tos -> from
    for (const toComponent of toComponents) {
      const connections = networkMap.get(toComponent) || [];
      connections.push(fromComponent);
      networkMap.set(toComponent, connections);
    }
  }

  // get combinations of components
  const components = Array.from(networkMap.keys());
  const routeMap: Map<string, Array<string>> = new Map();
  for (let i = 0; i < components.length; i++) {
    for (let j = i + 1; j < components.length; j++) {
      let routeKey = '';
      const route = [];

      if (components[i] < components[j]) {
        routeKey = `${components[i]}${components[j]}`;
        route.push(components[i]);
        route.push(components[j]);
      } else {
        routeKey = `${components[j]}${components[i]}`;
        route.push(components[j]);
        route.push(components[i]);
      }

      if (routeMap.has(routeKey)) {
        continue;
      }

      routeMap.set(routeKey, route);
    }
  }

  // Gets paths between a number of random component pairs
  const routeKeys = Array.from(routeMap.keys());
  shuffle(routeKeys);
  const paths = [];
  const iterations = routeKeys.length > 1000 ? 1000 : routeKeys.length;
  for (let i = 0; i < iterations; i++) {
    const randomKey = routeKeys[i];
    const [from, to] = routeMap.get(randomKey)!;
    const path = getPath(from, to, networkMap);
    paths.push(path);
  }

  // determine edges and count how common, my theory is that the 3 most common will
  // be the edges we need to snip
  const edgeCount = new Map();
  for (const path of paths) {
    if (path.length === 1) {
      continue;
    }
    for (let i = 1; i < path.length; i++) {
      const key =
        path[i - 1] < path[i]
          ? `${path[i - 1]}|${path[i]}`
          : `${path[i]}|${path[i - 1]}`;

      let count = edgeCount.get(key) || 0;
      count = count + 1;
      edgeCount.set(key, count);
    }
  }

  // get the most common edges (could be more than 3)
  const sortedEdges = Array.from(edgeCount).sort((a, b) => b[1] - a[1]);
  const position3Value = sortedEdges[2][1];
  let sublistLength = 3;
  for (let i = sublistLength; i < sortedEdges.length; i++) {
    if (sortedEdges[i][1] === position3Value) {
      sublistLength = i + 1;
      continue;
    }
    break;
  }

  // get submap and get combos then call splitter
  const topEdges = sortedEdges.slice(0, sublistLength);
  const topEdgeKeys = topEdges.map(x => x[0]);
  const combinations = getCombinations(topEdgeKeys, 3);

  // check each combination and see if snipping the edge will
  // lead to two groups of nodes
  let result = 0;
  for (const combination of combinations) {
    const groups = getGroups(combination, networkMap);
    if (groups.length === 2) {
      result = groups[0].size * groups[1].size;
    }
  }

  return result;
};

const getGroups = (
  edges: Array<string>,
  networkMap: Map<string, Array<string>>
): Array<Map<string, Array<string>>> => {
  // Firstly, given a list of 3 edges to cut, remove them from the map
  const networkMapClone: Map<string, Array<string>> = new Map(
    JSON.parse(JSON.stringify([...networkMap]))
  );
  for (const edgeKey of edges) {
    const edge = edgeKey.split('|');

    let destinations = networkMapClone.get(edge[0])!;
    let newDestinations = destinations.filter(x => x !== edge[1]);
    networkMapClone.set(edge[0], newDestinations);

    destinations = networkMapClone.get(edge[1])!;
    newDestinations = destinations.filter(x => x !== edge[0]);
    networkMapClone.set(edge[1], newDestinations);
  }

  // Now, iterate through creating groups until our map is empty
  // we should have 1 or more groups... if we've bisected the graph
  // with the 3 cuts then there will be 2 goups, else there should
  // only be 1 equal to the original map.
  const result = [];
  while (networkMapClone.size > 0) {
    const groupOfPoints: Map<string, Array<string>> = new Map();
    const startPoint = networkMapClone.keys().next().value;
    const queue: Array<string> = [startPoint!];
    const seen: Set<string> = new Set();

    while (queue.length > 0) {
      const component = queue.shift();
      if (seen.has(component!)) {
        continue;
      }
      seen.add(component!);
      const components = networkMapClone.get(component!);
      for (const tmpComponent of components!) {
        queue.push(tmpComponent);
      }
      networkMapClone.delete(component!);
      groupOfPoints.set(component!, components!);
      networkMapClone.delete(component!);
    }
    result.push(groupOfPoints);
  }
  return result;
};

const getCombinations = (
  array: Array<string>,
  combinationsLength: number
): Array<Array<string>> => {
  // https://www.geeksforgeeks.org/javascript/find-all-the-combinations-of-the-array-values-in-javascript/
  const combinations: Array<Array<string>> = [];

  function help(current: Array<string>, remaining: Array<string>) {
    if (remaining.length === 0) {
      if (current.length === combinationsLength) {
        combinations.push(current);
      }
      return;
    }

    help([...current, remaining[0]], remaining.slice(1));

    help(current, remaining.slice(1));
  }

  help([], array);
  return combinations;
};

// get path - start/end
const getPath = (
  from: string,
  to: string,
  connections: Map<string, Array<string>>
): Array<string> => {
  const queue: Array<Step> = [];
  const seen: Set<string> = new Set();

  const startingStep = new Step(from, [from]);
  queue.push(startingStep);

  while (queue.length > 0) {
    const componentStep = queue.shift();
    // First check if we are at our target
    if (componentStep!.component === to) {
      const path = componentStep!.path;
      // path.push(componentStep!.component)
      return path;
    }

    // Now dedupe the route so we don't end in circles
    if (seen.has(componentStep!.component)) {
      continue;
    }
    seen.add(componentStep!.component);

    // Add connected points of current to the queue
    const connected = connections.get(componentStep!.component);
    if (connected !== undefined) {
      for (const connection of connected!) {
        const nextPath = [...componentStep!.path];
        nextPath.push(connection);
        const nextStep = new Step(connection, nextPath);
        queue.push(nextStep);
      }
    }
  }

  // Hopefully we don't get here, if we do return empty list
  return [];
};

const shuffle = (array: Array<string>): void => {
  //https://stackoverflow.com/a/2450976
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
};
