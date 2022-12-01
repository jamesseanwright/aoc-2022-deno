import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getSignalStrength, run } from "./signal.ts";

const exampleInput = Deno.readTextFileSync("./day10/example_input.txt");
const mainInput = Deno.readTextFileSync("./day10/main_input.txt");

Deno.test("getSignalStrength() should return the total signal strength recorded within the given cycle window", () => {
  assertEquals(getSignalStrength(exampleInput, 220), 13140);
  assertEquals(getSignalStrength(mainInput, 220), 13180);
});

Deno.test("run() should execute the instructions and return a final rendering of the CRT output", () => {
  assertEquals(
    run(exampleInput),
    `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....
`,
  );

  assertEquals(
    run(mainInput),
    `####.####.####..##..#..#...##..##..###..
#.......#.#....#..#.#..#....#.#..#.#..#.
###....#..###..#....####....#.#..#.###..
#.....#...#....#....#..#....#.####.#..#.
#....#....#....#..#.#..#.#..#.#..#.#..#.
####.####.#.....##..#..#..##..#..#.###..
`,
  );
});
