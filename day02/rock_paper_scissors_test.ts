import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {
  calculateScoreByMoves,
  calculateScoreByStrategy,
} from "./rock_paper_scissors.ts";

const exampleInput = Deno.readTextFileSync("./day02/example_input.txt");
const mainInput = Deno.readTextFileSync("./day02/main_input.txt");

Deno.test("calculateScoreByMoves() should calculate the correct score assuming the pairs represent the player's and opponent's respective moves", () => {
  assertEquals(calculateScoreByMoves(exampleInput), 15);
  assertEquals(calculateScoreByMoves(mainInput), 13009);
});

Deno.test("calculateScoreByStrategy() should calculate the correct score assuming the second item in the pair represents the move the player should make", () => {
  assertEquals(calculateScoreByStrategy(exampleInput), 12);
  assertEquals(calculateScoreByStrategy(mainInput), 10398);
});
