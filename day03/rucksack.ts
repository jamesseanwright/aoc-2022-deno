const getPriority = (item: string) => {
  const codePoint = item.codePointAt(0) || 0;
  return codePoint >= 97 ? codePoint - 96 : codePoint - 38;
};

export const aggregateCommonRowItemPriorities = (input: string) =>
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

      return total + getPriority(commonItem);
    }, 0);

export const aggregrateCommonGroupItemPriorities = (
  input: string,
  groupSize: number,
) =>
  (input
    .match(new RegExp(`(.*\n){${groupSize}}`, "g")) || [])
    .map((group) =>
      group.split("\n").slice(0, groupSize) /* Trim trailing new lines */
    )
    .map(([firstGroup, ...restGroups]) => {
      for (const c of firstGroup) {
        if (restGroups.every((group) => group.includes(c))) {
          return c;
        }
      }

      return "";
    })
    .reduce((total, commonItem) => total + getPriority(commonItem), 0);
