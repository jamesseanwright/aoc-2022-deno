export const aggregateCommonGroupItemPriorities = (input: string) =>
  input
    .split("\n")
    .filter(Boolean)
    .map((group) => [
      group.slice(0, group.length / 2),
      group.slice(group.length / 2),
    ])
    .reduce((total, [left, right]) => {
      const commonItem = [...left].reduce(
        (common, c) => right.includes(c) ? c : common,
      );

      const codePoint = commonItem.codePointAt(0) || 0;

      return total + (codePoint >= 97 ? codePoint - 96 : codePoint - 38);
    }, 0);
