import { readFile } from "node:fs/promises";

type Range = { min: number; max: number };

const input = await readFile("./inputs/5.txt", { encoding: "utf8" });
const [inputRanges] = input.split("\n\n");
const ranges: Range[] = inputRanges.split("\n").map((line) => {
  const [minStr, maxStr] = line.split("-");
  return { min: Number(minStr), max: Number(maxStr) };
});

const normalizeRanges = (ranges: Range[]) => {
  const normalizedRanges: Range[] = [];
  ranges.forEach((range) => {
    let currentRangeMin = range.min;
    const minimalBeginningRange = normalizedRanges.find(
      (nrange) => currentRangeMin > nrange.min && currentRangeMin <= nrange.max
    );
    if (minimalBeginningRange) {
      currentRangeMin = minimalBeginningRange.max + 1;
    }
    while (true) {
      const minimalRange = normalizedRanges.reduce<Range | null>(
        (previousMinimum, nrange) => {
          if (nrange.min < currentRangeMin || nrange.min > range.max) {
            return previousMinimum;
          }
          if (previousMinimum === null || nrange.min < previousMinimum.min) {
            return nrange;
          }
          return previousMinimum;
        },
        null
      );
      if (minimalRange === null) {
        if (currentRangeMin <= range.max) {
          normalizedRanges.push({ min: currentRangeMin, max: range.max });
        }
        break;
      } else {
        if (currentRangeMin !== minimalRange.min) {
          normalizedRanges.push({
            min: currentRangeMin,
            max: minimalRange.min - 1,
          });
        }
        currentRangeMin = minimalRange.max + 1;
      }
    }
  });
  return normalizedRanges;
};

const isWithinRange = (n: number, outer: Range) =>
  n >= outer.min && n <= outer.max;
const validateNormalizedRanges = (ranges: Range[]) => {
  ranges.forEach((range) => {
    if (range.max < range.min) {
      throw new Error(`${range.max} < ${range.min}`);
    }
    ranges.forEach((range2) => {
      if (range === range2) return;
      if (
        isWithinRange(range.min, range2) ||
        isWithinRange(range.max, range2)
      ) {
        throw new Error(
          `Range ${JSON.stringify(range)} is partially within ${JSON.stringify(range2)}`
        );
      }
    });
  });
};

let freshCount = 0;
const normalized = normalizeRanges(ranges);
validateNormalizedRanges(normalized);
normalized.forEach((range) => {
  freshCount += range.max - range.min + 1;
});
console.log(freshCount);
