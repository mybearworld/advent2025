import { readFile } from "node:fs/promises";

const input = await readFile("./inputs/4.txt", { encoding: "utf8" });

const grid = input
  .split("\n")
  .map((line) => line.split("").map((character) => character === "@"));

const getAdjacent = (x: number, y: number) => [
  { x: x - 1, y: y - 1 },
  { x: x, y: y - 1 },
  { x: x + 1, y: y - 1 },
  { x: x - 1, y: y },
  { x: x + 1, y: y },
  { x: x - 1, y: y + 1 },
  { x: x, y: y + 1 },
  { x: x + 1, y: y + 1 },
];

const isAccessible = (x: number, y: number) => {
  let adjacentAmount = 0;
  for (const adjacent of getAdjacent(x, y)) {
    if (grid[adjacent.y]?.[adjacent.x]) {
      adjacentAmount++;
      if (adjacentAmount >= 4) {
        return false;
      }
    }
  }
  return true;
};

let accessibleCount = 0;
grid.forEach((line, y) => {
  line.forEach((isPaper, x) => {
    if (!isPaper) return;
    if (isAccessible(x, y)) {
      accessibleCount++;
    }
  });
});
console.log(accessibleCount);
