import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { arrangeStacks } from "./stacks.ts";

const exampleInput = Deno.readTextFileSync("./day5/example_input.txt");
const mainInput = Deno.readTextFileSync("./day5/main_input.txt");

Deno.test("arrangeStacks() should arrange the stacks by interpreting the given instructions", () => {
  assertEquals(arrangeStacks(exampleInput), `        [Z]
        [N]
        [D]
[C] [M] [P]
 1   2   3`);

  assertEquals(arrangeStacks(mainInput), '??');
});
