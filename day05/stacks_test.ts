import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { arrangeStacks } from "./stacks.ts";

const exampleInput = Deno.readTextFileSync("./day05/example_input.txt");
const mainInput = Deno.readTextFileSync("./day05/main_input.txt");

Deno.test("arrangeStacks() should arrange the stacks by interpreting the given instructions", () => {
  const exampleStacks = arrangeStacks(exampleInput);

  assertEquals(exampleStacks[0].at(-1), "[C]");
  assertEquals(exampleStacks[1].at(-1), "[M]");
  assertEquals(exampleStacks[2].at(-1), "[Z]");

  const mainStacks = arrangeStacks(mainInput);

  assertEquals(
    mainStacks.map((stack) => stack.at(-1))
      .filter(Boolean)
      .map((x) => x?.at(1))
      .join(""),
    "PSNRGBTFT",
  );
});

Deno.test("arrangeStacks() should preserve the order of moved items when preserveOrder is true", () => {
  const exampleStacks = arrangeStacks(exampleInput, true);

  assertEquals(exampleStacks[0].at(-1), "[M]");
  assertEquals(exampleStacks[1].at(-1), "[C]");
  assertEquals(exampleStacks[2].at(-1), "[D]");

  const mainStacks = arrangeStacks(mainInput, true);

  assertEquals(
    mainStacks.map((stack) => stack.at(-1))
      .filter(Boolean)
      .map((x) => x?.at(1))
      .join(""),
    "BNTZFPMMW",
  );
});
