const SOURCE_NODE_VALUE = "S";
const TARGET_NODE_VALUE = "E";

type Cell = [number, number];
type Queue<T> = Pick<Node<T>[], "unshift" | "pop" | "length">;

interface Node<T> {
  value: T;
  cell: Cell; // TODO: remove
  visited: boolean;
  distance: number;
  children: Node<T>[];
}

const createNode = <T>(value: T, cell: Cell): Node<T> => ({
  value,
  cell,
  visited: false,
  distance: 0,
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

  const node = createNode(value, cell);

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
  let startNode: Node<string> = createNode("", [-1, -1]);

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

const debug = (x: Node<string>) => {
  console.log("****** START");
  console.log(
    "****** line, col:",
    x.cell.map((a) => a + 1).toReversed().join(", "),
  );
  console.log("****** value:", x.value);
  console.log("****** visited:", x.visited);
  console.log(
    "****** children:",
    ...x.children.map(({ value, visited }) => `{${value}, ${visited}}`),
  );
};

export const getShortestPathStepCount = (input: string) => {
  const rows = input.split("\n").filter(Boolean); // LF

  const getShortestPathBF = (startNode: Node<string>) => {
    const queue: Queue<string> = [startNode];
    let node = startNode;

    while (queue.length > 0) {
      node = queue.pop()!;

      if (!node.visited) {
        node.visited = true;

        if (node.value === TARGET_NODE_VALUE) {
          return node.distance;
        }

        for (const neighbour of node.children) {
          if (
            getCodePoint(neighbour.value) - getCodePoint(node.value) <= 1
          ) {
            neighbour.distance = node.distance + 1;
            queue.unshift(neighbour);
          }
        }
      }
    }

    return Number.POSITIVE_INFINITY;
  };

  return getShortestPathBF(buildGraph(rows));
};
