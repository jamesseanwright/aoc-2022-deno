const SOURCE_NODE_VALUE = "S";
const TARGET_NODE_VALUE = "E";

type Cell = [number, number];
type Queue<T> = Pick<Node<T>[], "unshift" | "pop" | "length">;

interface Node<T> {
  value: T;
  visited: boolean;
  distance: number;
  children: Node<T>[];
}

const createNode = <T>(value: T): Node<T> => ({
  value,
  visited: false,
  distance: Number.POSITIVE_INFINITY,
  children: [],
});

const getHash = (cell: Cell) => cell.join("-");

const getOrCreateNode = (
  cell: Cell,
  value: string,
  visited: Map<string, Node<string>>,
): Node<string> => {
  const visitedNode = visited.get(getHash(cell));

  if (visitedNode) {
    return visitedNode;
  }

  const node = createNode(value);

  visited.set(getHash(cell), node);

  return node;
};

const getChildren = (
  [x, y]: Cell,
  rows: string[],
  visited: Map<string, Node<string>>,
): Node<string>[] =>
  ([[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]] as Cell[])
    .filter(([nx, ny]) => rows[ny]?.[nx])
    .map(([nx, ny]) => getOrCreateNode([nx, ny], rows[ny][nx], visited));

const buildGraph = (rows: string[]): Node<string> => {
  const visited = new Map<string, Node<string>>();
  let startNode: Node<string> = createNode("");

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const node = getOrCreateNode([x, y], rows[y][x], visited);
      node.children = getChildren([x, y], rows, visited);

      if (rows[y][x] === SOURCE_NODE_VALUE) {
        startNode = node;
      }
    }
  }

  return startNode;
};

const getCodePoint = (x?: string) => {
  switch (x) {
    case SOURCE_NODE_VALUE:
      return ("a".codePointAt(0) || 0);
    case TARGET_NODE_VALUE:
      return ("z".codePointAt(0) || 0);
    default:
      return (x?.codePointAt(0) || 0);
  }
};

export const getShortestPathStepCount = (input: string) => {
  const rows = input.split("\n").filter(Boolean); // LF

  const getShortestPathBF = (startNode: Node<string>) => {
    const queue: Queue<string> = [startNode];

    while (queue.length > 0) {
      const node = queue.pop()!;

      if (!node.visited) {
        node.visited = true;

        if (node.value === TARGET_NODE_VALUE) {
          return node.distance;
        }

        for (const neighbour of node.children) {
          neighbour.distance = node.distance + 1;

          if (
            (Math.abs(
              getCodePoint(neighbour.value) - getCodePoint(node.value),
            ) <= 1)
          ) {
            queue.unshift(neighbour);
          }
        }
      }
    }
  };

  const startNode = buildGraph(rows);
  startNode.distance = 0;

  return getShortestPathBF(startNode);
};
