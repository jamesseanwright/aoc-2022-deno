interface Node<T> {
  north?: Node<T>;
  south?: Node<T>;
  east?: Node<T>;
  west?: Node<T>;
  value?: T;
}

const createNode = <T>(x: number, y: number, nodes: Map<string, Node<T>>): Node<T> => {
  if (nodes.has(`${x}-${y}`)) {
    return nodes.get(`${x}-${y}`)!;
  }

  const node = {};

  nodes.set(`${x}-${y}`, node);

  return node;
};

const buildGraph = (rows: string[]): Node<string> => {
  const nodes = new Map<string, Node<string>>();

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const node = createNode(x, y, nodes);
      const value = rows[y][x];

      node.value = value

      if (x > 0) {
        node.west = createNode(x - 1, y, nodes);
      }

      if (x < rows[y].length - 1) {
        node.east = createNode(x + 1, y, nodes);
      }

      if (y > 0) {
        node.north = createNode(x, y - 1, nodes);
      }

      if (y < rows.length - 1) {
        node.south = createNode(x, y + 1, nodes);
      }
    }
  }

  return nodes.get('0-0') || {};
};

export const getShortestPathStepCount = (input: string) => {
  const rows = input.split("\n").filter(Boolean); // LF
  const graph = buildGraph(rows);
  // const start = findStart(graph);

  return 0;
};
