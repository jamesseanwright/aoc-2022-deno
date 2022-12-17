type Item = number | number[];

const parseList = (list: string): Item[] => JSON.parse(list);
const coerce = (x: Item) => Array.isArray(x) ? x : [x];

const compare = (left: Item[], right: Item[]): boolean => {
  for (let i = 0; i < left.length; i++) {
    if (right[i] === undefined) {
      return false;
    }

    if (
      (Array.isArray(left[i]) || Array.isArray(right[i])) &&
      !compare(coerce(left[i]), coerce(right[i]))
    ) {
      return false;
    }

    if (typeof left[i] === "number" && typeof right[i] === "number" && left[i] !== right[i]) { // TODO: abstract as type guard and document
      return left[i] < right[i];
    }
  }

  return true;
};

export const getPacketPairIntegritySum = (input: string) =>
  [...input.matchAll(/(\[.*\])\n(\[.*\])\n/g)]
    .map(([, ...pair]) => pair)
    .map(([left, right]) => [parseList(left), parseList(right)])
    .reduce(
      (total, [left, right], i) => compare(left, right) ? total + i + 1 : total,
      0,
    );
