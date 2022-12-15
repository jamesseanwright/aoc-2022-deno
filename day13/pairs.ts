type Item = string | string[];

const parseList = (list: string): Item[] => JSON.parse(list);
const coerce = (x: Item) => Array.isArray(x) ? x : [x];

const compare = (a: Item[], b: Item[]): boolean => {
  for (let i = 0; i < a.length; i++) {
    const left = a[i];
    const right = b[i];

    if (left && !right) {
      return false;
    }

    if (Array.isArray(left) || Array.isArray(right)) {
      return compare(coerce(left), coerce(right));
    }

    if (Number.parseInt(left) > Number.parseInt(right)) {
      return false;
    }
  }

  return true;
};

export const getPacketPairIntegritySum = (input: string) => {
  const pairs = [...input.matchAll(/(\[.*\])\n(\[.*\])\n/g)]
    .map(([, ...pair]) => pair)
    .map(([left, right]) => [parseList(left), parseList(right)]);

  return pairs.reduce(
    (total, [a, b], i) => compare(a, b) ? total + i + 1 : total,
    0,
  );
};
