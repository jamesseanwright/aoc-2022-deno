import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { findDeletionCandidate, sumSizeOfDirectoriesWithinSize } from "./fs.ts";

const exampleInput = Deno.readTextFileSync("./day7/example_input.txt");
const mainInput = Deno.readTextFileSync("./day7/main_input.txt");

Deno.test("sumSizeOfDirectoriesWithinSize() should return the total size of all the directories that are no greater than the specified size bound", () => {
  assertEquals(sumSizeOfDirectoriesWithinSize(exampleInput, 100000), 95437);
  assertEquals(sumSizeOfDirectoriesWithinSize(mainInput, 100000), 1908462);
});

Deno.test("findDeletionCandidate() should return the size of the smallest directory that will free up the required disk space", () => {
  assertEquals(findDeletionCandidate(exampleInput, 30000000, 70000000), 24933642);
  // assertEquals(findDeletionCandidate(mainInput, 30000000, 70000000), 0);
});
