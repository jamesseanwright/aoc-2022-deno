import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { calculateScore } from "./rock_paper_scissors.ts";

const exampleInput = Deno.readTextFileSync("./day2/example_input.txt");
const mainInput = Deno.readTextFileSync("./day2/main_input.txt");

Deno.test("calculateScore() should calculate the correct score for the given input", () => {
  assertEquals(calculateScore(exampleInput), 15);
  assertEquals(calculateScore(mainInput), 13009);
});
