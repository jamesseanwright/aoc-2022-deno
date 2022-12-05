import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { arrangeStacks } from "./stacks.ts";

const exampleInput = Deno.readTextFileSync("./day5/example_input.txt");
const mainInput = Deno.readTextFileSync("./day5/main_input.txt");

Deno.test("arrangeStacks() should arrange the stacks by interpreting the given instructions", () => {
  const exampleStacks = arrangeStacks(exampleInput);

  assertEquals(exampleStacks[0].at(-1), "[C]")
  assertEquals(exampleStacks[1].at(-1), "[M]")
  assertEquals(exampleStacks[2].at(-1), "[Z]")

  const mainStacks = arrangeStacks(mainInput);

  for (const stack of mainStacks) {
    assertEquals(stack.at(-1), "??");
  }
});
