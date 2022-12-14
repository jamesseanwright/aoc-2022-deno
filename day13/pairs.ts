// Note that this only parses the
// top-level into an array; any child
// lists are then parsed just-in-time.
const parseList = (list: string) => list.slice(1, -1).split(",");
const isList = (x: string) => x[0] === '[';

export const getPacketPairIntegritySum = (input: string) => {
  const pairs = [...input.matchAll(/(\[.*\])\n(\[.*\])\n\n/g)]
    .map(([, ...pair]) => pair);

  const compare = (a: string[], b: string[], areEqual = false): boolean =>
    a.reduce((equal, left, i) => {
      const right = b[i];

      if (equal || !right) {
        return equal;
      }

      if (isList(left) && isList(right)) {
        return compare(parseList(left), parseList(right), areEqual);
      }

      if (!isList(left) && isList(right)) {
        return compare([left], parseList(right), areEqual);
      }

      if (isList(left) && !isList(right)) {
        return compare(parseList(left), [right], areEqual);
      }

      return Number.parseInt(left) < Number.parseInt(right);
    }, areEqual);

  return pairs.reduce((total, [a, b], i) => compare(parseList(a), parseList(b)) ? total + i + 1 : total, 0)
}