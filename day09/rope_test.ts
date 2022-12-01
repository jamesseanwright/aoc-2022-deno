import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getTailVisitCount } from "./rope.ts";

const exampleInput = Deno.readTextFileSync("./day09/example_input.txt");
const secondExampleInput = Deno.readTextFileSync("./day09/example_input_2.txt");
const mainInput = Deno.readTextFileSync("./day09/main_input.txt");

Deno.test("getTailVisitCount() should calculate the number of positions the tail visits from the provided head motions", () => {
  assertEquals(getTailVisitCount(exampleInput), 13);
  assertEquals(getTailVisitCount(mainInput), 6271);
});

Deno.test("getTailVisitCount() should calculate the number of positions the tail visits for a custom rope length", () => {
  assertEquals(getTailVisitCount(exampleInput, 10), 1);
  assertEquals(getTailVisitCount(secondExampleInput, 10), 36);
  assertEquals(getTailVisitCount(mainInput, 10), 2458);
});
