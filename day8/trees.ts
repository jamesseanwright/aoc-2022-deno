export const getVisibleTreesCount = (input: string) => {
  let visible = 0;

  const grid = input.split("\n")
    .filter(Boolean) // removes file end line feed
    .map(row => row.split(""));

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];

    for (let j = 0; j < row.length; j++) {
      const atEdge = i === 0 || i === grid.length - 1 || j === 0 || j === row.length - 1;

      if (atEdge) {
        visible++;
      } else {

      }
    }
  }

  return visible;
};
