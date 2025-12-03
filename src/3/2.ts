import { readFile } from "node:fs/promises";

const input = await readFile("./inputs/3.txt", { encoding: "utf8" });

const banks = input
  .split("\n")
  .map((s) => [...s].map((character) => Number(character)));

const getOptimalJoltage = (bank: number[], size: number): number | null => {
  if (bank.length < size) return null;
  const positionIndices: Record<number, number[]> = {};
  bank.forEach((number, i) => {
    positionIndices[number] ??= [];
    positionIndices[number].push(i);
  });
  for (let i = 9; i > 0; i--) {
    if (!positionIndices[i]) continue;
    if (size === 1) return i;
    const firstIndex = Math.min(...positionIndices[i]);
    const joltage = getOptimalJoltage(bank.slice(firstIndex + 1), size - 1);
    if (!joltage) continue;
    return 10 ** (Math.floor(Math.log10(joltage)) + 1) * i + joltage;
  }
  throw new Error(`No voltage found for ${bank.join("")} with ${size}`);
};

let sum = 0;
banks.forEach((bank) => {
  const joltage = getOptimalJoltage(bank, 12);
  if (joltage === null) {
    throw new Error(`Null voltage for ${bank.join("")}`);
  }
  sum += joltage;
});
console.log(sum);
