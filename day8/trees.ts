export const getVisibleTreesCount = (input: string) => {
  const visible = new Set<string>();

  const grid = input.split("\n")
    .filter(Boolean) // removes file end line feed
    .map(row => row.split(""));

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];

    for (let j = 0; j < row.length; j++) {
      let isVisibleFromRight = true;

      for (let a = j + 1; a < row.length; a++) {
        if (Number.parseInt(row[j]) <= Number.parseInt(row[a])) {
          isVisibleFromRight = false;
          break;
        }
      }

      if (isVisibleFromRight) {
        visible.add(`${i}${j}`);
      }

      let isVisibleFromLeft = true;

      for (let a = j - 1; a >= 0; a--) {
        if (Number.parseInt(row[j]) <= Number.parseInt(row[a])) {
          isVisibleFromLeft = false;
          break;
        }
      }

      if (isVisibleFromLeft) {
        visible.add(`${i}${j}`);
      }

      let isVisibleFromBottom = true;

      for (let a = i + 1; a < grid.length; a++) {
        if (Number.parseInt(grid[i][j]) <= Number.parseInt(grid[a][j])) {
          isVisibleFromBottom = false;
          break;
        }
      }

      if (isVisibleFromBottom) {
        visible.add(`${i}${j}`);
      }

      let isVisibleFromTop = true;

      for (let a = i - 1; a >= 0; a--) {
        if (Number.parseInt(grid[i][j]) <= Number.parseInt(grid[a][j])) {
          isVisibleFromTop = false;
          break;
        }
      }

      if (isVisibleFromTop) {
        visible.add(`${i}${j}`);
      }
    }
  }

  return visible.size;
};
