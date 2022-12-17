type Item = number | number[];

const parseList = (list: string): Item[] => JSON.parse(list);
const coerce = (x: Item) => Array.isArray(x) ? x : [x];

enum ComparisonResult {
  Left,
  Right,
  Equal,
}

const compare = (left: Item[], right: Item[]): ComparisonResult => {
  for (let i = 0; i < left.length; i++) {
    if (right[i] === undefined) {
      return ComparisonResult.Right;
    }

    if (
      typeof left[i] === "number" && typeof right[i] === "number" &&
      left[i] !== right[i]
    ) { // TODO: abstract as type guard and document
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

export const getPacketPairIntegritySum = (input: string) =>
  [...input.matchAll(/(\[.*\])\n(\[.*\])\n/g)]
    .map(([, ...pair]) => pair)
    .map(([left, right]) => [parseList(left), parseList(right)])
    .reduce(
      (total, [left, right], i) =>
        compare(left, right) === ComparisonResult.Left ? total + i + 1 : total,
      0,
    );
