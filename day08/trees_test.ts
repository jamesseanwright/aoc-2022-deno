import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getHighestScenicScore, getVisibleTreesCount } from "./trees.ts";

const exampleInput = Deno.readTextFileSync("./day08/example_input.txt");
const mainInput = Deno.readTextFileSync("./day08/main_input.txt");

Deno.test("getVisibleTreesCount() should return the number of trees that are visible from an edge of the grid", () => {
  assertEquals(getVisibleTreesCount(exampleInput), 21);
  assertEquals(getVisibleTreesCount(mainInput), 1684);
});

Deno.test("getHighestScenicScore() should return the highest possible scenic score for any tree in the grid", () => {
  assertEquals(getHighestScenicScore(exampleInput), 8);
  assertEquals(getHighestScenicScore(mainInput), 486540);
});
