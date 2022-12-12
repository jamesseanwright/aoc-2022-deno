const SIGNAL_START_CYCLE = 20;
const SIGNAL_CYCLE_INTERVAL = 40;

export const getSignalStrength = (input: string, maxCycles: number) => {
  const instructions = input
    .split("\n")
    .filter(Boolean) // !file line ending
    .map((line) => line.split(" ")).toReversed();

  let x = 1;
  let signalStrength = 0;
  const stack: [string, string][] = [];

  for (let cycle = 1; cycle <= maxCycles; cycle++) {
    if ((cycle - SIGNAL_START_CYCLE) % SIGNAL_CYCLE_INTERVAL === 0) {
      signalStrength += cycle * x;
    }

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

  return signalStrength;
};
