import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getFirstMessageIndex, getFirstPacketIndex } from "./databuffer.ts";

const exampleInput = Deno.readTextFileSync("./day06/example_input.txt");
const mainInput = Deno.readTextFileSync("./day06/main_input.txt");

Deno.test("getFirstPacketIndex() should return the index where the first data packet starts", () => {
  assertEquals(getFirstPacketIndex(exampleInput), 7);
  assertEquals(getFirstPacketIndex(mainInput), 1929);
});

Deno.test("getFirstMessageIndex() should return the index where the first full message package starts", () => {
  assertEquals(getFirstMessageIndex(exampleInput), 19);
  assertEquals(getFirstMessageIndex(mainInput), 3298);
});
