import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getTailVisitCount } from "./rope.ts";

const exampleInput = Deno.readTextFileSync("./day7/example_input.txt");
const mainInput = Deno.readTextFileSync("./day7/main_input.txt");

Deno.test("getTailVisitCount() should calculate the number of positions the tail visits from the provided head motions", () => {
  assertEquals(getTailVisitCount(exampleInput), 13);
  assertEquals(getTailVisitCount(mainInput), 0);
});
