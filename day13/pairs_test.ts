import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getDecoderKey, getPacketPairIntegritySum } from "./pairs.ts";

const exampleInput = Deno.readTextFileSync("./day13/example_input.txt");
const mainInput = Deno.readTextFileSync("./day13/main_input.txt");

Deno.test("getPacketPairIntegritySum() should return the sum of the indices of all valid packet pairs", () => {
  assertEquals(getPacketPairIntegritySum(exampleInput), 13);
  assertEquals(getPacketPairIntegritySum(mainInput), 6240);
});

Deno.test("getDecoderKey() should return the expected key for the given divider packets", () => {
  assertEquals(getDecoderKey(exampleInput, "[[2]]", "[[6]]"), 140);
  assertEquals(getDecoderKey(mainInput, "[[2]]", "[[6]]"), 23142);
});
