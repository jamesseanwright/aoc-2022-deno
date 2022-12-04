import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { aggregateCommonGroupItemPriorities } from "./rucksack.ts";

const exampleInput = Deno.readTextFileSync("./day3/example_input.txt");
const mainInput = Deno.readTextFileSync("./day3/main_input.txt");

Deno.test("aggregateCommonGroupItemPriorities() should compute the sum of the items' priorities that occur in both partitions of a group", () => {
  assertEquals(aggregateCommonGroupItemPriorities(exampleInput), 157);
  assertEquals(aggregateCommonGroupItemPriorities(mainInput), 7811);
});
