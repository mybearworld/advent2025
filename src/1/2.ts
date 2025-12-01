import { readFile } from "node:fs/promises";

const input = await readFile("./inputs/1.txt", { encoding: "utf8" });

const lines = input.split("\n");
const rotations = lines.map((line) => {
  const match = line.match(/^([RL])(\d+)$/);
  if (!match) throw new Error(`no match on ${line}`);
  const [, rl, numString] = match;
  return { right: rl === "R", amount: Number(numString) };
});

let number = 50;
let numberOfZeroes = 0;
rotations.forEach((rotation) => {
  for (let i = 0; i < rotation.amount; i++) {
    number += rotation.right ? 1 : -1;
    if (number === -1) number = 99;
    if (number === 100) number = 0;
    if (number === 0) numberOfZeroes++;
  }
});
console.log(numberOfZeroes);
