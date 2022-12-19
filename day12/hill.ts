const SOURCE_NODE_VALUE = "S";
const TARGET_NODE_VALUE = "E";

type Cell = [number, number];

const getCodePoint = (x?: string) => (x?.codePointAt(0) || 0);

export const getShortestPathStepCount = (input: string) => {
  const rows = input.split("\n").filter(Boolean); // LF
  let start: Cell = [-1, -1];

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] === SOURCE_NODE_VALUE) {
        start = [x, y];
      }
    }
  }

  const getPaths = ([x, y]: Cell, currentPath: Cell[], paths: Cell[][]) => {
    currentPath.push([x, y]);

    if (rows[y][x] === TARGET_NODE_VALUE) {
      return;
    }

    ([[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]] as Cell[])
      .forEach(([nx, ny]) => {
        const canVisit = rows[ny]?.[nx] &&
          !currentPath.some(([vx, vy]) => nx === vx && vy === vy) &&
          (rows[y][x] === SOURCE_NODE_VALUE ||
            Math.abs(getCodePoint(rows[ny][nx]) - getCodePoint(rows[y][x])) <=
              1);

        if (canVisit) {
          getPaths([nx, ny], [...currentPath], paths);
        } else {
          paths.push(currentPath);
        }
      });
  };

  const paths: Cell[][] = [];

  getPaths(start, [], paths);

  return paths.toSorted((a, b) => a.length - b.length)[0].length;
};
