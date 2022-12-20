import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getShortestPathStepCount } from "./hill.ts";

const exampleInput = Deno.readTextFileSync("./day12/example_input.txt");
const mainInput = Deno.readTextFileSync("./day12/main_input.txt");

Deno.test("getShortestPathStepCount() should return the number of steps for the shortest path from S to E", () => {
  assertEquals(getShortestPathStepCount(exampleInput), 31);
  // assertEquals(getShortestPathStepCount(mainInput), -1);
});
