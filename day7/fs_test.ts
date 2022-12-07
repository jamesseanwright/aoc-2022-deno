import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { sumSizeOfDirectoriesWithinSize } from "./fs.ts";

const exampleInput = Deno.readTextFileSync("./day7/example_input.txt");
const mainInput = Deno.readTextFileSync("./day7/main_input.txt");

Deno.test("sumSizeOfDirectoriesWithinSize() should return the total size of all the directories that are no greater than the specified size bound", () => {
  assertEquals(sumSizeOfDirectoriesWithinSize(exampleInput, 100000), 95437);
  assertEquals(sumSizeOfDirectoriesWithinSize(mainInput, 100000), 1908462);
});
