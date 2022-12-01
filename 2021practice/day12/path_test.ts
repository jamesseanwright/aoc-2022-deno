import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getNumberOfPermutationsWithUniqueSmallValues } from "./path.ts";

const input = Deno.readTextFileSync("./2021practice/day12/input.txt");

Deno.test(
  "getNumberOfPermutationsWithUniqueSmallValues() should return the number of possible paths where nodes with small values are only visited once",
  () => {
    const n = getNumberOfPermutationsWithUniqueSmallValues(input);
    assertEquals(n, 3450);
  },
);
