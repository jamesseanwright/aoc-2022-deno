const isWithinRange = (ax: string, an: string, bx: string, bn: string) =>
  Number.parseInt(ax) >= Number.parseInt(bx) &&
  Number.parseInt(an) <= Number.parseInt(bn);

const overlaps = (ax: string, bx: string, bn: string) =>
  Number.parseInt(ax) >= Number.parseInt(bx) &&
  Number.parseInt(ax) <= Number.parseInt(bn);

export const countPairsWithFullyOverlappingRanges = (input: string) =>
  [...input.matchAll(/(\d+)-(\d+),(\d+)-(\d+)/g)]
    .reduce(
      (total, [, ax, an, bx, bn]) =>
        isWithinRange(ax, an, bx, bn) || isWithinRange(bx, bn, ax, an)
          ? total + 1
          : total,
      0,
    );

export const countPairsWithPartiallyOverlappingRanges = (input: string) =>
  [...input.matchAll(/(\d+)-(\d+),(\d+)-(\d+)/g)]
    .reduce(
      (total, [, ax, an, bx, bn]) =>
        overlaps(ax, bx, bn) || overlaps(bx, ax, an) ? total + 1 : total,
      0,
    );
