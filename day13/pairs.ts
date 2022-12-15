type Item = string | string[];

const parseList = (list: string): Item[] => JSON.parse(list);
const coerce = (x: Item) => Array.isArray(x) ? x : [x];

const compare = (left: Item[], right: Item[]): boolean => {
  for (let i = 0; i < left.length; i++) {
    if (left[i] && !right[i]) {
      return false;
    }

    if (Array.isArray(left[i]) || Array.isArray(right[i])) {
      return compare(coerce(left[i]), coerce(right[i]));
    }

    if (
      left[i] && !right[i] ||
      Number.parseInt(left[i] as string) > Number.parseInt(right[i] as string)
    ) {
      return false;
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
