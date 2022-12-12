const SIGNAL_START_CYCLE = 20;
const SIGNAL_CYCLE_INTERVAL = 40;
const CRT_SIZE = 240;

const executeInstructions = (
  input: string,
  maxCycles: number,
  onCycle: (cycle: number, x: number) => void,
) => {
  const instructions = input
    .split("\n")
    .filter(Boolean) // !file line ending
    .map((line) => line.split(" ")).toReversed();

  let x = 1;
  const stack: [string, string][] = [];

  for (let cycle = 1; cycle <= maxCycles; cycle++) {
    onCycle(cycle, x);

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
};

export const getSignalStrength = (input: string, maxCycles: number) => {
  let signalStrength = 0;

  executeInstructions(input, maxCycles, (cycle, x) => {
    if ((cycle - SIGNAL_START_CYCLE) % SIGNAL_CYCLE_INTERVAL === 0) {
      signalStrength += cycle * x;
    }
  });

  return signalStrength;
};

export const run = (input: string) => {
  const screen: boolean[] = [];

  executeInstructions(input, CRT_SIZE, (cycle, x) => {
    const pixel = cycle - 1;

    screen[pixel] = (pixel % SIGNAL_CYCLE_INTERVAL) >= x - 1 &&
      (pixel % SIGNAL_CYCLE_INTERVAL) <= x + 1;
  });

  return screen.reduce(
    (out, pixel, i) =>
      out + (pixel ? "#" : ".") +
      ((i + 1) % SIGNAL_CYCLE_INTERVAL === 0 ? "\n" : ""),
    "",
  );
};
