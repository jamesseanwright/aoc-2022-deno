type Item = string | string[];

const isList = (x: string) => x === "[";

const parseList = (list: string): Item[] => {
  const arr: Item[] = [];

  const walk = (x: string, i = 1, out = arr) => {
    if (i === x.length - 1) {
      return;
    }

    if (isList(x)) {
      const children: string[] = [];
      out.push(children);
      walk(x, i + 1, children);
    } else {
      walk(x, i + 1, out);
    }
  };

  walk(list);

  return arr;
};

const coerce = (x: Item) => Array.isArray(x) ? x : [x];

const compare = (a: Item[], b: Item[]): boolean => {
  for (let i = 0; i < b.length; i++) {
    const right = b[i];
    const left = a[i];

    if (Array.isArray(left) || Array.isArray(right)) {
      return compare(coerce(left), coerce(right));
    }

    if (right && !left || Number.parseInt(left) < Number.parseInt(right)) {
      return true;
    }
  }

  return false;
};

export const getPacketPairIntegritySum = (input: string) => {
  const pairs = [...input.matchAll(/(\[.*\])\n(\[.*\])\n\n/g)]
    .map(([, ...pair]) => pair)
    .map(([left, right]) => [parseList(left), parseList(right)]);

  return pairs.reduce(
    (total, [a, b], i) => compare(a, b) ? total + i + 1 : total,
    0,
  );
};
