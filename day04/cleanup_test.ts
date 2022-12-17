import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

import {
  countPairsWithFullyOverlappingRanges,
  countPairsWithPartiallyOverlappingRanges,
} from "./cleanup.ts";

const exampleInput = Deno.readTextFileSync("./day04/example_input.txt");
const mainInput = Deno.readTextFileSync("./day04/main_input.txt");

Deno.test("countPairsWithFullyOverlappingRanges() should return the number of pairs where one range fully contains the other", () => {
  assertEquals(countPairsWithFullyOverlappingRanges(exampleInput), 2);
  assertEquals(countPairsWithFullyOverlappingRanges(mainInput), 431);
});

Deno.test("countPairsWithPartiallyOverlappingRanges() should return the number of pairs where either bound of one pair falls within the range of the other", () => {
  assertEquals(countPairsWithPartiallyOverlappingRanges(exampleInput), 4);
  assertEquals(countPairsWithPartiallyOverlappingRanges(mainInput), 823);
});
