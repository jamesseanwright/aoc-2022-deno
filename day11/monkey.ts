const createOperation = (left: string, operator: string, right: string) => ({
  left,
  operator,
  right,
});

const createTest = (divisor: string, left: string, right: string) => ({
  divisor: Number.parseInt(divisor),
  left: Number.parseInt(left),
  right: Number.parseInt(right),
});

const createMonkey = (
  [
    ,
    ,
    items,
    leftOperand,
    operator,
    rightOperand,
    testDivisor,
    testLeft,
    testRight,
  ]: RegExpMatchArray,
) => ({
  items: items.split(", ").map((x) => Number.parseInt(x)),
  operation: createOperation(leftOperand, operator, rightOperand),
  test: createTest(testDivisor, testLeft, testRight),
});

export const getMonkeyBusinessLevel = (input: string, rounds: number) => {
  const monkeys = [
    ...input.matchAll(
      /Monkey (\d+):\n\s{2}Starting items: (.+)\n\s{2}Operation: new = (.*) ([\/\*\+\-]) (.*)\n\s{2}Test: divisible by (\d+)\n\s{4}If true: throw to monkey (\d+)\n\s{4}If false: throw to monkey (\d+)\n/g,
    ),
  ]
    .map((match) => createMonkey(match));

  return 0;
};
