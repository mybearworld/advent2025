import { readFile } from "node:fs/promises";

const input = await readFile("./inputs/7.txt", { encoding: "utf8" });
const grid = input.split("\n").map((line) => line.split(""));

const findS = () => {
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      const col = row[x];
      if (col === "S") {
        return { x, y };
      }
    }
  }
  throw new Error("No S");
};

let splitCount = 0;
const positions = new Set<`${number}/${number}`>();
const tachyonStep = (position: { x: number; y: number }) => {
  const col = grid[position.y]?.[position.x];
  if (!col) {
    return;
  } else if (col === "^") {
    const positionString = `${position.x}/${position.y}` as const;
    if (!positions.has(positionString)) {
      splitCount++;
      positions.add(positionString);
      tachyonStep({ x: position.x + 1, y: position.y + 1 });
      tachyonStep({ x: position.x - 1, y: position.y + 1 });
    }
  } else {
    tachyonStep({ x: position.x, y: position.y + 1 });
  }
};

const sPosition = findS();
tachyonStep(sPosition);
console.log(splitCount);
