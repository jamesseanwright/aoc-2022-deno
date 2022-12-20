const SOURCE_NODE_VALUE = "S";
const TARGET_NODE_VALUE = "E";

type Cell = [number, number];

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
      console.log('********* FOUND PATH!', currentPath);
      paths.push(currentPath);
      return;
    }

    ([[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]] as Cell[])
      .forEach(([nx, ny]) => {
        const canVisit = rows[ny]?.[nx] &&
          !currentPath.some(([vx, vy]) => nx === vx && ny === vy) &&
          // TODO: rejig source node check to offset by neighbour; isn't always next to an 'a'!
          (Math.abs(getCodePoint(rows[ny][nx]) - getCodePoint(rows[y][x])) <=
            1);

        if (canVisit) {
          getPaths([nx, ny], [...currentPath], paths);
        }
      });
  };

  const paths: Cell[][] = [];

  getPaths(start, [], paths);

  return paths.toSorted((a, b) => a.length - b.length)[0].length - 1;
};
