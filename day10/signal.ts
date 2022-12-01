const SIGNAL_START_CYCLE = 20;
const SIGNAL_CYCLE_INTERVAL = 40;
const CRT_SIZE = 240;

const executeInstructions = <T>(
  input: string,
  maxCycles: number,
  onCycle: (cycle: number, x: number) => T,
): T[] => {
  const results: T[] = [];

  const instructions = input
    .split("\n")
    .filter(Boolean) // !file line ending
    .map((line) => line.split(" ")).toReversed();

  let x = 1;
  const stack: [string, string][] = [];

  for (let cycle = 1; cycle <= maxCycles; cycle++) {
    results.push(onCycle(cycle, x));

    if (stack.length > 0) {
      const [instruction, arg] = stack.pop()!;

      if (instruction === "addx") {
        x += Number.parseInt(arg);
      }
    } else {
      const [instruction, arg] = instructions.pop()!;

      if (instruction === "addx") {
        stack.push([instruction, arg]);
      }
    }
  }

  return results;
};

export const getSignalStrength = (input: string, maxCycles: number) =>
  executeInstructions(
    input,
    maxCycles,
    (cycle, x) =>
      (cycle - SIGNAL_START_CYCLE) % SIGNAL_CYCLE_INTERVAL === 0
        ? cycle * x
        : 0,
  ).reduce((total, x) => total + x, 0);

export const run = (input: string) =>
  executeInstructions(input, CRT_SIZE, (cycle, x) => {
    const pixel = cycle - 1;

    return (pixel % SIGNAL_CYCLE_INTERVAL) >= x - 1 &&
      (pixel % SIGNAL_CYCLE_INTERVAL) <= x + 1;
  }).reduce(
    (out, pixel, i) =>
      out + (pixel ? "#" : ".") +
      ((i + 1) % SIGNAL_CYCLE_INTERVAL === 0 ? "\n" : ""),
    "",
  );
