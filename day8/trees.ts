type TreeScores = [number, number, number, number, number, number];

const getTreeScores = (grid: string[][]) => {
  const scoreSet: TreeScores[] = [];

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];

    for (let j = 0; j < row.length; j++) {
      let rightScore = 0;

      for (let a = j + 1; a <= row.length; a++) {
        if (Number.parseInt(row[j]) > Number.parseInt(row[a])) {
          rightScore++;
        } else {
          break;
        }
      }

      let leftScore = 0;

      for (let a = j - 1; a >= 0; a--) {
        if (Number.parseInt(row[j]) > Number.parseInt(row[a])) {
          leftScore++;
        } else {
          break;
        }
      }


      let bottomScore = 0;

      for (let a = i + 1; a < grid.length; a++) {
        if (Number.parseInt(grid[i][j]) > Number.parseInt(grid[a][j])) {
          bottomScore++;
        } else {
          break;
        }
      }

      let topScore = 0;

      for (let a = i - 1; a >= 0; a--) {
        if (Number.parseInt(grid[i][j]) > Number.parseInt(grid[a][j])) {
          topScore++;
        } else {
          break;
        }
      }

      scoreSet.push([j, i, rightScore, leftScore, bottomScore, topScore]);
    }
  }

  return scoreSet;
}

export const getVisibleTreesCount = (input: string) => {
  const visible = new Set<string>();

  const grid = input.split("\n")
    .filter(Boolean) // removes file end line feed
    .map((row) => row.split(""));

  const rowCount = grid.length;
  const colCount = grid[0].length;

  getTreeScores(grid).forEach(([x, y, right, left, bottom, top]) => {
    if (
      x + right === rowCount - 1 ||
      x - left === 0 ||
      y + bottom === colCount - 1 ||
      y - top === 0
    ) {
      visible.add(`${x}-${y}`);
    }
  });

  return visible.size;
};

export const getHighestScenicScore = (input: string) => {
  const scores = new Set<number>();

  const grid = input.split("\n")
    .filter(Boolean) // removes file end line feed
    .map((row) => row.split(""));

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];

    for (let j = 0; j < row.length; j++) {
      let rightScore = 0;

      for (let a = j + 1; a < row.length; a++) {
        rightScore++;

        if (Number.parseInt(row[j]) <= Number.parseInt(row[a])) {
          break;
        }
      }

      let leftScore = 0;

      for (let a = j - 1; a >= 0; a--) {
        leftScore++;

        if (Number.parseInt(row[j]) <= Number.parseInt(row[a])) {
          break;
        }
      }


      let bottomScore = 0;

      for (let a = i + 1; a < grid.length; a++) {
        bottomScore++;

        if (Number.parseInt(grid[i][j]) <= Number.parseInt(grid[a][j])) {
          break;
        }
      }

      let topScore = 0;

      for (let a = i - 1; a >= 0; a--) {
        topScore++;

        if (Number.parseInt(grid[i][j]) <= Number.parseInt(grid[a][j])) {
          break;
        }
      }

      scores.add(rightScore * leftScore * bottomScore * topScore);
    }
  }

  return [...scores.values()].toSorted((a, b) => b - a)[0];
};
