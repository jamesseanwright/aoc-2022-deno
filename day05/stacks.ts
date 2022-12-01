const buildStack = (rows: string[], i: number) => {
  const stack: string[] = [];

  for (let j = rows.length - 2; j >= 0; j--) {
    const [, , item] = [...rows[j].matchAll(/(\s{4})|(\[[A-Z]\])\s?/g)][i] ||
      [];

    if (item && item.trim()) {
      stack.push(item);
    }
  }

  return stack;
};

export const arrangeStacks = (input: string, preserveOrder = false) => {
  const [rawStacks, rawCommands] = input.split("\n\n");
  const rows = rawStacks.split("\n");

  const nthStack = Number.parseInt(
    [...(rows.at(-1) || "").matchAll(/\s(\d)$/g)]
      .at(-1)
      ?.at(0) || "-1",
  );

  const stacks: string[][] = [];

  for (let i = 0; i < nthStack; i++) {
    stacks[i] = buildStack(rows, i);
  }

  const commands = [...rawCommands.matchAll(/move (\d+) from (\d) to (\d)/g)];

  for (const [, n, a, z] of commands) {
    const count = Number.parseInt(n);
    const from = Number.parseInt(a) - 1;
    const to = Number.parseInt(z) - 1;
    let items = stacks[from].splice(stacks[from].length - count, count);

    items = preserveOrder ? items : items.toReversed();

    stacks[to].push(...items);
  }

  return stacks;
};
