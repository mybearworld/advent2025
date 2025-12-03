import { readFile } from "node:fs/promises";

const input = await readFile("./inputs/3.txt", { encoding: "utf8" });

const banks = input
  .split("\n")
  .map((s) => [...s].map((character) => Number(character)));

const getOptimalJoltage = (bank: number[]) => {
  const positionIndices: Record<number, number[]> = {};
  bank.forEach((number, i) => {
    positionIndices[number] ??= [];
    positionIndices[number].push(i);
  });
  for (let i = 9; i > 0; i--) {
    if (!positionIndices[i]) continue;
    const firstIndex = Math.min(...positionIndices[i]);
    for (let j = 9; j > 0; j--) {
      if (
        positionIndices[j] &&
        positionIndices[j].some((secondIndex) => secondIndex > firstIndex)
      ) {
        return i * 10 + j;
      }
    }
  }
  throw new Error(`No voltage found for ${bank.join("")}`);
};

let sum = 0;
banks.forEach((bank) => {
  sum += getOptimalJoltage(bank);
});
console.log(sum);
