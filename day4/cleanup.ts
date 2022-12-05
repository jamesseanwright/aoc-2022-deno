type Predicate = (ax: string, an: string, bx: string, bn: string) => boolean;

const areWithinRange = (ax: string, an: string, bx: string, bn: string) =>
  Number.parseInt(ax) >= Number.parseInt(bx) &&
  Number.parseInt(an) <= Number.parseInt(bn);

const overlap = (ax: string, _: string, bx: string, bn: string) =>
  Number.parseInt(ax) >= Number.parseInt(bx) &&
  Number.parseInt(ax) <= Number.parseInt(bn);

export const countPairsThat = (predicate: Predicate) => (input: string) =>
  [...input.matchAll(/(\d+)-(\d+),(\d+)-(\d+)/g)]
    .reduce(
      (total, [, ax, an, bx, bn]) =>
        predicate(ax, an, bx, bn) || predicate(bx, bn, ax, an)
          ? total + 1
          : total,
      0,
    );

export const countPairsWithFullyOverlappingRanges = countPairsThat(
  areWithinRange,
);

export const countPairsWithPartiallyOverlappingRanges = countPairsThat(overlap);
