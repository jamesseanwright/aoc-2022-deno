import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getMonkeyBusinessLevel } from "./monkey.ts";

const exampleInput = Deno.readTextFileSync("./day11/example_input.txt");
const mainInput = Deno.readTextFileSync("./day11/main_input.txt");

Deno.test("getMonkeyBusinessLevel() should multiply the item inspection count of the two busiest monkeys over n rounds", () => {
  assertEquals(getMonkeyBusinessLevel(exampleInput, 20, 3), 10605);
  assertEquals(getMonkeyBusinessLevel(mainInput, 20, 3), 99852);

  assertEquals(getMonkeyBusinessLevel(exampleInput, 10000), 2713310158);
  assertEquals(getMonkeyBusinessLevel(mainInput, 10000), 25935263541);
});
