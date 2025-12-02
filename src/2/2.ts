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
  for (let i = 2; i <= id.length; i++) {
    if (id.length % i !== 0) continue;
    const slice = id.slice(0, id.length / i);
    if (slice.repeat(i) === id) return false;
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
