const WORRY_LEVEL_DIVISOR = 3;

interface Operation {
  left: string;
  operator: string;
  right: string;
}

interface Test {
  divisor: number;
  left: number;
  right: number;
}

const createOperation = (
  left: string,
  operator: string,
  right: string,
): Operation => ({
  left,
  operator,
  right,
});

const createTest = (divisor: string, left: string, right: string): Test => ({
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
  inspected: 0,
  items: items.split(", ").map((x) => Number.parseInt(x)),
  operation: createOperation(leftOperand, operator, rightOperand),
  test: createTest(testDivisor, testLeft, testRight),
});

const invokeOperation = (item: number, op: Operation) => {
  const left = op.left === "old" ? item : Number.parseInt(op.left);

  const right = op.right === "old" ? item : Number.parseInt(op.right);

  switch (op.operator) {
    case "*":
      return left * right;
    case "/":
      return left / right;
    case "+":
      return left + right;
    case "-":
      return left - right;
    default:
      throw new Error(
        `Unrecognised operator ${op.operator} in operation expression`,
      );
  }
};

const invokeTest = (worryLevel: number, test: Test) =>
  worryLevel % test.divisor === 0 ? test.left : test.right;

export const getMonkeyBusinessLevel = (input: string, rounds: number) => {
  const monkeys = [
    ...input.matchAll(
      /Monkey (\d+):\n\s{2}Starting items: (.+)\n\s{2}Operation: new = (.*) ([\/\*\+\-]) (.*)\n\s{2}Test: divisible by (\d+)\n\s{4}If true: throw to monkey (\d+)\n\s{4}If false: throw to monkey (\d+)\n/g,
    ),
  ]
    .map((match) => createMonkey(match));

  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {
      let item = monkey.items.shift();

      while (item !== undefined) {
        const worryLevel = invokeOperation(item, monkey.operation);
        const normalisedLevel = Math.floor(worryLevel / WORRY_LEVEL_DIVISOR);
        const targetMonkey = invokeTest(normalisedLevel, monkey.test);

        monkeys[targetMonkey].items.push(normalisedLevel);
        monkey.inspected++;
        item = monkey.items.shift();
      }
    }
  }

  return monkeys.toSorted((a, b) => b.inspected - a.inspected)
    .slice(0, 2)
    .reduce((n, monkey) => n * monkey.inspected, 1);
};
