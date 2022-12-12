type Result = [number, number, boolean, number, number, number, number];

const traverseGrid = (grid: string[][]) => {
  const results: Result[] = [];

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];

    for (let j = 0; j < row.length; j++) {
      let visibleFromRight = true;
      let rightScore = 0;

      for (let a = j + 1; a < row.length; a++) {
        rightScore++;

        if (Number.parseInt(row[j]) <= Number.parseInt(row[a])) {
          visibleFromRight = false;
          break;
        }
      }

      let visibleFromLeft = true;
      let leftScore = 0;

      for (let a = j - 1; a >= 0; a--) {
        leftScore++;

        if (Number.parseInt(row[j]) <= Number.parseInt(row[a])) {
          visibleFromLeft = false;
          break;
        }
      }


      let visibleFromBottom = true;
      let bottomScore = 0;

      for (let a = i + 1; a < grid.length; a++) {
        bottomScore++;

        if (Number.parseInt(grid[i][j]) <= Number.parseInt(grid[a][j])) {
          visibleFromBottom = false;
          break;
        }
      }

      let visibleFromTop = true;
      let topScore = 0;

      for (let a = i - 1; a >= 0; a--) {
        topScore++;

        if (Number.parseInt(grid[i][j]) <= Number.parseInt(grid[a][j])) {
          visibleFromTop = false;
          break;
        }
      }

      results.push([
        j,
        i,
        [visibleFromBottom, visibleFromLeft, visibleFromRight, visibleFromTop].some(v => v),
        rightScore,
        leftScore,
        bottomScore,
        topScore,
      ]);
    }
  }

  return results;
}

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

  return [...traverseGrid(grid)]
    .map(([, , , right, left, bottom, top]) => (
      right * left * bottom * top
    ))
    .toSorted((a, b) => b - a)[0];
};
