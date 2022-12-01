import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getLargestTotal } from "./elf_calories.ts";

const input = Deno.readTextFileSync("./day1/input.txt");

Deno.test("getLargestTotal() should return the total of the largest group", () => {
    const largestTotal = getLargestTotal(input);

    assertEquals(largestTotal, 71780);
});
