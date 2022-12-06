import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getFirstPacketIndex } from "./databuffer.ts";

const exampleInput = Deno.readTextFileSync("./day6/example_input.txt");
const mainInput = Deno.readTextFileSync("./day6/main_input.txt");

Deno.test("getFirstPacketIndex() should return the index where the first post-header data packet starts", () => {
  assertEquals(getFirstPacketIndex(exampleInput), 7);
  assertEquals(getFirstPacketIndex(mainInput), 1929);
});
