const getSortedTotals = (input: string) =>
  input.split("\n\n")
    .map((groups) => groups.split("\n"))
    .map((group) => group.reduce((n, x) => n + Number.parseInt(x), 0))
    .sort((a, b) => b - a);

export const getLargestTotal = (input: string) => getSortedTotals(input)[0];

export const getTotalForNLargestGroups = (input: string, n: number) =>
  getSortedTotals(input)
    .slice(0, n)
    .reduce((n, x) => n + x, 0);
