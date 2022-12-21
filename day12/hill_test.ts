import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getShortestPathStepCount } from "./hill.ts";

const exampleInput = Deno.readTextFileSync("./day12/example_input.txt");
const mainInput = Deno.readTextFileSync("./day12/main_input.txt");

Deno.test("getShortestPathStepCount() should return the number of steps for the shortest path from the source node to E", () => {
  assertEquals(getShortestPathStepCount(exampleInput, "S"), 31);
  assertEquals(getShortestPathStepCount(mainInput, "S"), 520);

  assertEquals(getShortestPathStepCount(exampleInput, "S", "a"), 29);
  assertEquals(getShortestPathStepCount(mainInput, "S", "a"), 508);
});
