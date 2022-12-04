import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

import {
  countPairsWithFullyOverlappingRanges,
} from "./cleanup.ts";

const exampleInput = Deno.readTextFileSync("./day4/example_input.txt");
const mainInput = Deno.readTextFileSync("./day4/main_input.txt");

Deno.test("countPairsWithFullyOverlappingRanges() should return the number of pairs where one range fully contains the other", () => {
  assertEquals(countPairsWithFullyOverlappingRanges(exampleInput), 2);
  assertEquals(countPairsWithFullyOverlappingRanges(mainInput), -1);
});
