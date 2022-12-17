type Item = number | number[];

const parseList = (list: string): Item[] => JSON.parse(list);
const coerce = (x: Item) => Array.isArray(x) ? x : [x];

enum ComparisonResult {
  Left = -1,
  Right,
  Equal,
}

// Returns the *smallest* item i.e:
// * ComparisonResult.Left === left list is smallest
// * ComparisonResult.Right === right list is smallest
const compare = (left: Item[], right: Item[]): ComparisonResult => {
  for (let i = 0; i < left.length; i++) {
    if (right[i] === undefined) {
      return ComparisonResult.Right;
    }

    if (
      typeof left[i] === "number" && typeof right[i] === "number" &&
      left[i] !== right[i]
    ) {
      return left[i] < right[i]
        ? ComparisonResult.Left
        : ComparisonResult.Right;
    }

    if (
      (Array.isArray(left[i]) || Array.isArray(right[i]))
    ) {
      const res = compare(coerce(left[i]), coerce(right[i]));

      if (res !== ComparisonResult.Equal) {
        return res;
      }
    }
  }

  return left.length === right.length
    ? ComparisonResult.Equal
    : ComparisonResult.Left;
};

const indexOfList = (lists: Item[][], list: Item[]) =>
  lists.findIndex((x) => compare(x, list) === ComparisonResult.Equal);

export const getPacketPairIntegritySum = (input: string) =>
  [...input.matchAll(/(\[.*\])\n(\[.*\])\n/g)]
    .map(([, ...pair]) => pair)
    .map(([left, right]) => [parseList(left), parseList(right)])
    .reduce(
      (total, [left, right], i) =>
        compare(left, right) === ComparisonResult.Left ? total + i + 1 : total,
      0,
    );

export const getDecoderKey = (input: string, divA: string, divB: string) => {
  const parsedA = parseList(divA);
  const parsedB = parseList(divB);

  const sorted = [
    ...(input.match(/^\[.*\]$/gm) || [])
      .map((list) => parseList(list)),
    parsedA,
    parsedB,
  ].toSorted((a, b) => compare(a, b));

  return (indexOfList(sorted, parsedA) + 1) *
    (indexOfList(sorted, parsedB) + 1);
};
