const isList = (x: string) => x === '[';

export const getPacketPairIntegritySum = (input: string) => {
  const pairs = [...input.matchAll(/(\[.*\])\n(\[.*\])\n\n/g)]
    .map(([, ...pair]) => pair);

  const compare = (a: string, b: string, areEqual = true): boolean =>
    [...a].reduce((equal, left, i) => {
      const right = b[i];

      if (!right) {
        return areEqual;
      }

      if (!isList(left) && isList(right)) {
        return compare(left, right.slice(1));
      }

      if (isList(left) && !isList(right)) {
        return compare(left.slice(1), right);
      }

      return equal && Number.parseInt(left) < Number.parseInt(right);
    }, areEqual);

  return pairs.reduce((total, [a, b]) => compare(a, b) ? total + 1 : total, 0)
}