const SOURCE_NODE_VALUE = "S";
const TARGET_NODE_VALUE = "E";

const getCodePoint = (x?: string) => (x?.codePointAt(0) || 0);

export const getShortestPathStepCount = (input: string) => {
  const rows = input.split("\n").filter(Boolean); // LF
  let start: [number, number] = [-1, -1];

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] === SOURCE_NODE_VALUE) {
        start = [x, y];
      }
    }
  }

  const getPaths = ([x, y]: [number, number], steps = 0) => {
    if (rows[y][x] === TARGET_NODE_VALUE) {
      return steps;
    }

    // TODO: walk
  };

  console.log("****", getPaths(start));
  return 0;
};
