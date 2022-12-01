type Result = [number, number, boolean, number, number, number, number];

const scan = (
  i: number,
  n: number,
  predicate: (a: number) => boolean,
): [number, boolean] => {
  let score = 0;
  let visibleFromEdge = true;

  for (let a = i + 1; a < n; a++) {
    score++;

    if (predicate(a)) {
      visibleFromEdge = false;
      break;
    }
  }

  return [score, visibleFromEdge];
};

const scanBackwards = (
  i: number,
  predicate: (a: number) => boolean,
): [number, boolean] => {
  let score = 0;
  let visibleFromEdge = true;

  for (let a = i - 1; a >= 0; a--) {
    score++;

    if (predicate(a)) {
      visibleFromEdge = false;
      break;
    }
  }

  return [score, visibleFromEdge];
};

const traverseGrid = (grid: string[][]) => {
  const results: Result[] = [];

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];

    for (let j = 0; j < row.length; j++) {
      const [rightScore, visibleFromRight] = scan(
        j,
        row.length,
        (a) => Number.parseInt(row[j]) <= Number.parseInt(row[a]),
      );

      const [leftScore, visibleFromLeft] = scanBackwards(
        j,
        (a) => Number.parseInt(row[j]) <= Number.parseInt(row[a]),
      );

      const [bottomScore, visibleFromBottom] = scan(
        i,
        grid.length,
        (a) => Number.parseInt(grid[i][j]) <= Number.parseInt(grid[a][j]),
      );

      const [topScore, visibleFromTop] = scanBackwards(
        i,
        (a) => Number.parseInt(grid[i][j]) <= Number.parseInt(grid[a][j]),
      );

      results.push([
        j,
        i,
        [visibleFromBottom, visibleFromLeft, visibleFromRight, visibleFromTop]
          .some((v) => v),
        rightScore,
        leftScore,
        bottomScore,
        topScore,
      ]);
    }
  }

  return results;
};

export const getVisibleTreesCount = (input: string) => {
  const visible = new Set<string>();

  const grid = input.split("\n")
    .filter(Boolean) // removes file end line feed
    .map((row) => row.split(""));

  traverseGrid(grid).forEach(([x, y, isVisibleFromEdge]) => {
    if (isVisibleFromEdge) {
      visible.add(`${x}-${y}`);
    }
  });

  return visible.size;
};

export const getHighestScenicScore = (input: string) => {
  const grid = input.split("\n")
    .filter(Boolean) // removes file end line feed
    .map((row) => row.split(""));

  return traverseGrid(grid)
    .map(([, , , right, left, bottom, top]) => (
      right * left * bottom * top
    ))
    .toSorted((a, b) => b - a)[0];
};
