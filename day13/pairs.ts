const isList = (x?: string) => x?.[0] === "[";

// Note that this only parses the
// top-level into an array; any child
// lists are then parsed just-in-time.
const parseList = (x: string) => isList(x) ? x.slice(1, -1).split(",") : [x];

const compare = (a: string[], b: string[]): boolean => {
  console.log('*****', a, b);
  for (let i = 0; i < b.length; i++) {
    const right = b[i];
    const left = a[i];

    if (isList(left) || isList(right)) {
      return compare(parseList(left), parseList(right));
    }

    if (right && !left || Number.parseInt(left) < Number.parseInt(right)) {
      return true;
    }
  }

  return false;
};

export const getPacketPairIntegritySum = (input: string) => {
  const pairs = [...input.matchAll(/(\[.*\])\n(\[.*\])\n\n/g)]
    .map(([, ...pair]) => pair);

  return pairs.reduce(
    (total, [a, b], i) =>
      compare(parseList(a), parseList(b)) ? total + i + 1 : total,
    0,
  );
};
