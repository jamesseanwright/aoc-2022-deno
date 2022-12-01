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

interface Monkey {
  inspected: number;
  items: number[];
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
): Monkey => ({
  inspected: 0,
  items: items.split(", ").map((x) => Number.parseInt(x)),
  operation: createOperation(leftOperand, operator, rightOperand),
  test: createTest(testDivisor, testLeft, testRight),
});

const withM = (x: number, m?: number) => m ? x % m : x;

const invokeOperation = (item: number, op: Operation, m?: number) => {
  const left = op.left === "old" ? item : Number.parseInt(op.left);
  const right = op.right === "old" ? item : Number.parseInt(op.right);

  switch (op.operator) {
    case "*":
      return withM(withM(left, m) * withM(right, m), m);
    case "+":
      return withM(withM(left, m) + withM(right, m), m);
    default:
      throw new Error(
        `Unrecognised operator ${op.operator} in operation expression`,
      );
  }
};

const invokeTest = (worryLevel: number, test: Test) =>
  worryLevel % test.divisor === 0 ? test.left : test.right;

// To handle bigger worry levels, we can multiply all of
// the divisors in the set of monkeys, m, and apply it as
// a modulo to each operand and the overall result of an
// operation. This takes advantage of k: (a mod km) mod m = a mod m,
// where:
// * k: set of all integers
// * a: an input integer
// See: r/adventofcode/comments/zihouc/comment/izrimjo
const getDivisorProduct = (monkeys: Monkey[]) =>
  monkeys.reduce((n, monkey) => n * monkey.test.divisor, 1);

export const getMonkeyBusinessLevel = (
  input: string,
  rounds: number,
  worryLevelDivisor = 1,
) => {
  const monkeys = [
    ...input.matchAll(
      /Monkey (\d+):\n\s{2}Starting items: (.+)\n\s{2}Operation: new = (.*) ([\*\+]) (.*)\n\s{2}Test: divisible by (\d+)\n\s{4}If true: throw to monkey (\d+)\n\s{4}If false: throw to monkey (\d+)\n/g,
    ),
  ]
    .map((match) => createMonkey(match));

  const m = worryLevelDivisor === 1 ? getDivisorProduct(monkeys) : undefined;

  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {
      let item = monkey.items.shift();

      while (item !== undefined) {
        const worryLevel = invokeOperation(item, monkey.operation, m);
        const normalisedLevel = Math.floor(worryLevel / worryLevelDivisor);
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
