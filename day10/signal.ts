const SIGNAL_START_CYCLE = 20;
const SIGNAL_CYCLE_INTERVAL = 40;
const CRT_SIZE = 240;

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

export const run = (input: string) => {
  const instructions = input
    .split("\n")
    .filter(Boolean) // !file line ending
    .map((line) => line.split(" ")).toReversed();

  let x = 1;
  const stack: [string, string][] = [];
  const screen = Array.from<boolean>({ length: CRT_SIZE }).fill(false);

  for (let cycle = 1; cycle <= CRT_SIZE; cycle++) {
    const pixel = cycle - 1;
    screen[pixel] = pixel >= x-1 && pixel <= x+1;

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

  return screen.reduce(
    (out, pixel, i) => out + (pixel ? "#" : ".") + ((i + 1) % SIGNAL_CYCLE_INTERVAL === 0 ? "\n" : ""),
    "",
  );
};
