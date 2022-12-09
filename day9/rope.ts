type Point2D = [number, number];

const getVelocity = (direction: string, steps: number): Point2D => {
  switch (direction) {
    case 'R':
      return [steps, 0];
    case 'L':
      return [-steps, 0];
    case 'U':
      return [0, -steps];
    case 'D':
      return [0, steps];
  }

  return [0, 0];
}

const rotate = ([x, y]: Point2D): Point2D => [y * -1, x * -1];

const move = (pos: Point2D, steps: Point2D): Point2D =>
  pos.map((a, i) => a + steps[i]) as Point2D;

const getEuclidianDistance = (a: Point2D, b: Point2D) => {
  const displacement = b.map((p, i) => p - a[i]);

  return Math.floor(Math.sqrt(displacement.reduce((dis, p) => dis + p * p, 0)));
};

const areDiagonal = (a: Point2D, b: Point2D) =>
  [a, b].reduce(([prevX, prevY], [x, y]) => [prevX - x, prevY - y]).every(a => a !== 0);

export const getTailVisitCount = (input: string) =>
  input.split("\n")
    .filter(Boolean) // trims file line ending
    .map(move => move.split(" "))
    .reduce<[number, Point2D, Point2D]>(([total, headPos, tailPos], [direction, steps]) => {
      const newHeadPos = move(headPos, getVelocity(direction, Number.parseInt(steps)));
      const distance = getEuclidianDistance(tailPos, newHeadPos);
      let newTailPos = move(tailPos, getVelocity(direction, distance - 1));

      if (distance > 1 && areDiagonal(newHeadPos, newTailPos)) {
        newTailPos = move(newTailPos, rotate(getVelocity(direction, 1)))
      }

      return [total + distance - 1, newHeadPos, newTailPos]
    }, [0, [0, 0], [0, 0]])
    .at(0);
