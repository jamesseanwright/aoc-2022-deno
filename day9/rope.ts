type Point2D = [number, number];

const range = (length: number) => Array.from({ length });

const getVelocity = (direction: string): Point2D => {
  switch (direction) {
    case "R":
      return [1, 0];
    case "L":
      return [-1, 0];
    case "U":
      return [0, -1];
    case "D":
      return [0, 1];
  }

  return [0, 0];
};

const mult = (p: Point2D, x: number): Point2D => p.map((a) => a * x) as Point2D;

const move = (pos: Point2D, steps: Point2D): Point2D =>
  pos.map((a, i) => a + steps[i]) as Point2D;

const getEuclidianDistance = (a: Point2D, b: Point2D) => {
  const displacement = b.map((p, i) => p - a[i]);

  return Math.floor(Math.sqrt(displacement.reduce((dis, p) => dis + p * p, 0)));
};

const areDiagonal = (a: Point2D, b: Point2D) =>
  [a, b].reduce(([prevX, prevY], [x, y]) => [prevX - x, prevY - y]).every((a) =>
    a !== 0
  );

const areEqual = ([aX, aY]: Point2D, [bX, bY]: Point2D) => aX == bX && aY == bY;

const hasBeenVisited = (visited: Point2D[], [x, y]: Point2D) =>
  visited.some(([visitedX, visitedY]) => visitedX === x && visitedY === y);

const createRope = (length: number) =>
  Array.from<Point2D>({ length }).fill([0, 0]);

export const getTailVisitCount = (input: string, length = 1) =>
  input.split("\n")
    .filter(Boolean) // trims file line ending
    .map((move) => move.split(" "))
    .reduce<[number, Point2D[], Point2D[]]>(
      ([total, prevRope, visited], [direction, steps]) => {
        const path = range(Number.parseInt(steps)).reduce<
          [Point2D[], Point2D?][]
        >((acc) => {
          const nextRope = prevRope.reduce<[Point2D[], Point2D[]]>(([next, visited], p, i) => {
            if (i === 0) {
              return [
                [
                  ...next,
                  move(p, getVelocity(direction)),
                ],
                visited,
              ]
            }

            const parent = next[i - 1]
            let newTailPos = p;

            if (getEuclidianDistance(parent, newTailPos) > 1) {
              newTailPos = move(newTailPos, getVelocity(direction));

              if (areDiagonal(parent, newTailPos)) {
                newTailPos = move(parent, mult(getVelocity(direction), -1));
              }
            }

            return [
              [
                ...next,
                newTailPos,
              ],
              areEqual(p, newTailPos) ? undefined : newTailPos
            ]
          }, []);

          return nextRope;
        }, []);

        const unvisitedTailNodes = path
          .map(([, , uniqueTail]) => uniqueTail)
          .filter((p) =>
            p !== undefined && !hasBeenVisited(visited, p)
          ) as Point2D[];

        return [total + unvisitedTailNodes.length, nextRope, [
          ...visited,
          ...unvisitedTailNodes,
        ]];
      },
      [0, createRope(length), []],
    )
    .at(0);
