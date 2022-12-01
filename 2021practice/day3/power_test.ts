import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { getPowerConsumption } from "./power.ts";

const exampleInput = Deno.readTextFileSync(
  "./2021practice/day3/example_input.txt",
);
const mainInput = Deno.readTextFileSync("./2021practice/day3/main_input.txt");

Deno.test(
  "getPowerConsumption() should return the total power consumption for the given input",
  () => {
    assertEquals(getPowerConsumption(exampleInput), 198);
    assertEquals(getPowerConsumption(mainInput), 4103154);
  },
);
