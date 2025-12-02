import { readFile } from "node:fs/promises";

const input = await readFile("./inputs/2.txt", { encoding: "utf8" });

const ranges: { start: number; end: number }[] = [];
for (const match of input.matchAll(/(\d+)-(\d+)(?:,|$)/g)) {
  const [, startString, endString] = match;
  const start = Number(startString);
  const end = Number(endString);
  ranges.push({ start, end });
}

const isValid = (id: string) => {
  // looking at this after, not exactly the best code i've ever written
  for (let i = 1; i <= Math.ceil(id.length / 2); i++) {
    if (id.slice(0, i).repeat(2) === id) return false;
  }
  return true;
};

let invalidSum = 0;
ranges.forEach((range) => {
  for (let i = range.start; i <= range.end; i++) {
    const iString = i.toString();
    if (!isValid(iString)) {
      invalidSum += i;
    }
  }
});

console.log(invalidSum);
