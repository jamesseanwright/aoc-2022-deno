import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getLargestTotal, getTotalForNLargestGroups } from "./elf_calories.ts";

const input = Deno.readTextFileSync("./day01/input.txt");

Deno.test("getLargestTotal() should return the total of the largest group", () => {
  const largestTotal = getLargestTotal(input);

  assertEquals(largestTotal, 71780);
});

Deno.test("getTotalForNLargestGroups() should return the combined total of the n largest groups", () => {
  const total = getTotalForNLargestGroups(input, 3);

  assertEquals(total, 212489);
});
