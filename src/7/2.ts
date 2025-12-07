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

const memoizedTachyonStop = new Map<`${number}/${number}`, number>();
const tachyonStep = (position: { x: number; y: number }): number => {
  const positionString = `${position.x}/${position.y}` as const;
  const memoizedSplitCount = memoizedTachyonStop.get(positionString);
  if (memoizedSplitCount !== undefined) {
    return memoizedSplitCount;
  }
  const memoize = (value: number) => {
    memoizedTachyonStop.set(positionString, value);
    return value;
  };
  const col = grid[position.y]?.[position.x];
  if (!col) {
    return memoize(1);
  } else if (col === "^") {
    return memoize(
      tachyonStep({ x: position.x + 1, y: position.y + 1 }) +
        tachyonStep({ x: position.x - 1, y: position.y + 1 })
    );
  } else {
    return memoize(tachyonStep({ x: position.x, y: position.y + 1 }));
  }
};

const sPosition = findS();
console.log(tachyonStep(sPosition));
