const SOURCE_NODE_VALUE = "S";
const TARGET_NODE_VALUE = "E";

interface Node<T> {
  north?: Node<T>;
  south?: Node<T>;
  east?: Node<T>;
  west?: Node<T>;
  value?: T;
}

const createNode = <T>(
  x: number,
  y: number,
  nodes: Map<string, Node<T>>,
): Node<T> => {
  if (nodes.has(`${x}-${y}`)) {
    return nodes.get(`${x}-${y}`)!;
  }

  const node = {};

  nodes.set(`${x}-${y}`, node);

  return node;
};

const buildGraph = (rows: string[]): Node<string> => {
  const nodes = new Map<string, Node<string>>();
  let sourcePos = [0, 0];

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const node = createNode(x, y, nodes);
      const value = rows[y][x];

      node.value = value;

      if (node.value === SOURCE_NODE_VALUE) {
        sourcePos = [x, y];
      }

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

  return nodes.get(sourcePos.join("-")) || {};
};

const getCodePoint = (x?: string) => (x?.codePointAt(0) || 0);

export const getShortestPathStepCount = (input: string) => {
  const rows = input.split("\n").filter(Boolean); // LF
  const source = buildGraph(rows);

  const traverse = (node: Node<string>, steps = 0) => {
    if (node.value === TARGET_NODE_VALUE) {
      return steps;
    }

    [node.north, node.south, node.east, node.west].forEach((neighbour) => {
      if (
        neighbour &&
        Math.abs(getCodePoint(neighbour.value) - getCodePoint(node.value)) <= 1
      ) {
        traverse(neighbour, steps + 1);
      }
    });
  };

  console.log("****", traverse(source!));
  return traverse(source!);
};
