const DEFAULT_SOURCE_NODE_VALUE = "S";
const TARGET_NODE_VALUE = "E";

type Cell = [number, number];
type Queue<T> = Pick<T[], "unshift" | "pop" | "length">;

interface Node<T> {
  value: T;
  children: Node<T>[];
}

const createNode = <T>(value: T): Node<T> => ({
  value,
  children: [],
});

const getHash = (cell: Cell) => cell.join("-");

const getOrCreateNode = (
  cell: Cell,
  value: string,
  nodes: Map<string, Node<string>>,
): Node<string> => {
  const visitedNode = nodes.get(getHash(cell));

  if (visitedNode) {
    return visitedNode;
  }

  const node = createNode(value);

  nodes.set(getHash(cell), node);

  return node;
};

const getChildren = (
  [x, y]: Cell,
  rows: string[],
  nodes: Map<string, Node<string>>,
): Node<string>[] =>
  ([[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]] as Cell[])
    .filter(([nx, ny]) => rows[ny]?.[nx])
    .map(([nx, ny]) => getOrCreateNode([nx, ny], rows[ny][nx], nodes));

const buildGraph = (
  rows: string[],
  sourceNodeValues: string[],
): Node<string>[] => {
  const nodes = new Map<string, Node<string>>();
  const sourceNodes: Node<string>[] = [];

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const node = getOrCreateNode([x, y], rows[y][x], nodes);
      node.children = getChildren([x, y], rows, nodes);

      if (sourceNodeValues.includes(rows[y][x])) {
        sourceNodes.push(node);
      }
    }
  }

  return sourceNodes;
};

const getCodePoint = (x?: string) => {
  switch (x) {
    case DEFAULT_SOURCE_NODE_VALUE:
      return ("a".codePointAt(0) || 0);
    case TARGET_NODE_VALUE:
      return ("z".codePointAt(0) || 0);
    default:
      return (x?.codePointAt(0) || 0);
  }
};

const getShortestPathBFS = (sourceNode: Node<string>) => {
  const queue: Queue<[Node<string>, number]> = [];
  const visited = new Set<Node<string>>();
  let node = sourceNode;
  let distance = 0;

  queue.unshift([sourceNode, 0]);

  while (queue.length > 0) {
    [node, distance] = queue.pop()!;

    if (!visited.has(node)) {
      visited.add(node);

      if (node.value === TARGET_NODE_VALUE) {
        return distance;
      }

      for (const neighbour of node.children) {
        if (
          getCodePoint(neighbour.value) - getCodePoint(node.value) <= 1
        ) {
          queue.unshift([neighbour, distance + 1]);
        }
      }
    }
  }

  return Number.POSITIVE_INFINITY;
};

export const getShortestPathStepCount = (
  input: string,
  ...sourceNodeValues: string[]
) =>
  buildGraph(input.split("\n").filter(Boolean), sourceNodeValues)
    .map((sourceNode) => getShortestPathBFS(sourceNode))
    .toSorted((a, b) => a - b)[0];
