type Point2D = [number, number];

const getVelocity = (direction: string): Point2D => {
  switch (direction) {
    case 'R':
      return [1, 0];
    case 'L':
      return [-1, 0];
    case 'U':
      return [0, -1];
    case 'D':
      return [0, 1];
  }

  return [0, 0];
}

const mult = (pos: Point2D, x: number): Point2D =>
  pos.map(a => a * x) as Point2D;

const move = (pos: Point2D, steps: Point2D): Point2D =>
  pos.map((a, i) => a + steps[i]) as Point2D;

const getEuclidianDistance = (a: Point2D, b: Point2D) => {
  const displacement = b.map((p, i) => p - a[i]);

  return Math.floor(Math.sqrt(displacement.reduce((dis, p) => dis + p * p, 0)));
};

const areDiagonal = (a: Point2D, b: Point2D) =>
  [a, b].reduce(([prevX, prevY], [x, y]) => [prevX - x, prevY - y]).every(a => a !== 0);

const hasBeenVisited = (visited: Point2D[], [x, y]: Point2D) =>
  visited.some(([visitedX, visitedY]) => visitedX === x && visitedY === y);

export const getTailVisitCount = (input: string) =>
  input.split("\n")
    .filter(Boolean) // trims file line ending
    .map(move => move.split(" "))
    .reduce<[number, Point2D, Point2D, Point2D[]]>(([total, headPos, tailPos, visited], [direction, steps]) => {
      const path = Array.from({ length: Number.parseInt(steps) }).reduce<[Point2D, Point2D][]>((acc, _, i) => {
        const [prevHead, prevTail] = acc[0];
        const newHeadPos = move(prevHead, getVelocity(direction));

        return [
          [newHeadPos, getEuclidianDistance(newHeadPos, prevTail) > 1
            ? move(prevTail, getVelocity(direction))
            : prevTail],
          ...acc,
        ];
      }, [[headPos, tailPos]]);

      const [newHeadPos, newTailPos] = path[0];

      const unvisitedTailNodes = path
        .map(([, tail]) => tail)
        .filter(p => !hasBeenVisited(visited, p));

      return [total + unvisitedTailNodes.length, newHeadPos, newTailPos, [...visited, ...unvisitedTailNodes]];
    }, [0, [0, 0], [0, 0], []])
    .at(0);
