import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

import {
  aggregateCommonRowItemPriorities,
  aggregrateCommonGroupItemPriorities,
} from "./rucksack.ts";

const exampleInput = Deno.readTextFileSync("./day03/example_input.txt");
const mainInput = Deno.readTextFileSync("./day03/main_input.txt");

Deno.test("aggregateCommonRowItemPriorities() should compute the sum of the items' priorities that occur in both partitions of each row", () => {
  assertEquals(aggregateCommonRowItemPriorities(exampleInput), 157);
  assertEquals(aggregateCommonRowItemPriorities(mainInput), 7811);
});

Deno.test("aggregrateCommonGroupItemPriorities() should compute the sum of the items' priorities that occur once in each row for the configured group size", () => {
  assertEquals(aggregrateCommonGroupItemPriorities(exampleInput, 3), 70);
  assertEquals(aggregrateCommonGroupItemPriorities(mainInput, 3), 2639);
});
