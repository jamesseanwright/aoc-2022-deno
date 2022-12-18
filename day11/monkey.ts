interface Operation {
  left: string;
  operator: string;
  right: string;
}

interface Test {
  divisor: bigint;
  left: number;
  right: number;
}

interface Monkey {
  inspected: number;
  items: bigint[];
  operation: Operation;
  test: Test;
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
  divisor: BigInt(divisor),
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
): Monkey => ({
  inspected: 0,
  items: items.split(", ").map((x) => BigInt(x)),
  operation: createOperation(leftOperand, operator, rightOperand),
  test: createTest(testDivisor, testLeft, testRight),
});

const invokeOperation = (item: bigint, op: Operation, m: bigint) => {
  const left = op.left === "old" ? item : BigInt(op.left);
  const right = op.right === "old" ? item : BigInt(op.right);

  switch (op.operator) {
    case "*":
      return ((left % m) * (right % m)) % m;
    case "+":
      return ((left % m) + (right % m)) % m;
    default:
      throw new Error(
        `Unrecognised operator ${op.operator} in operation expression`,
      );
  }
};

const invokeTest = (worryLevel: bigint, test: Test) =>
  worryLevel % test.divisor === 0n ? test.left : test.right;

const getDivisorProduct = (monkeys: Monkey[]) =>
  monkeys.reduce((n, monkey) => n * monkey.test.divisor, 1n);

export const getMonkeyBusinessLevel = (input: string, rounds: number, worryLevelDivisor = 1n) => {
  const monkeys = [
    ...input.matchAll(
      /Monkey (\d+):\n\s{2}Starting items: (.+)\n\s{2}Operation: new = (.*) ([\*\+]) (.*)\n\s{2}Test: divisible by (\d+)\n\s{4}If true: throw to monkey (\d+)\n\s{4}If false: throw to monkey (\d+)\n/g,
    ),
  ]
    .map((match) => createMonkey(match));

  const m = getDivisorProduct(monkeys);

  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {
      let item = monkey.items.shift();

      while (item !== undefined) {
        const worryLevel = invokeOperation(item, monkey.operation, m);
        const normalisedLevel = worryLevel / worryLevelDivisor;
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
