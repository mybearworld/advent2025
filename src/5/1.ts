import { readFile } from "node:fs/promises";

const input = await readFile("./inputs/5.txt", { encoding: "utf8" });
const [inputRanges, inputIngredients] = input.split("\n\n");
const ranges = inputRanges.split("\n").map((line) => {
  const [minStr, maxStr] = line.split("-");
  return { min: Number(minStr), max: Number(maxStr) };
});
const ingredients = inputIngredients.split("\n").map((line) => Number(line));

let freshCount = 0;
ingredients.forEach((ingredient) => {
  if (
    ranges.some((range) => ingredient >= range.min && ingredient <= range.max)
  ) {
    freshCount++;
  }
});
console.log(freshCount);
