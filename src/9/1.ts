import { readFile } from "node:fs/promises";

const input = await readFile("./inputs/9.txt", { encoding: "utf8" });
const coords = input.split("\n").map((line) => {
  const [xString, yString] = line.split(",");
  return { x: Number(xString), y: Number(yString) };
});

let maxArea = 0;
for (let i = 0; i < coords.length; i++) {
  const coordA = coords[i];
  for (let j = i + 1; j < coords.length; j++) {
    const coordB = coords[j];
    const area =
      (Math.abs(coordB.x - coordA.x) + 1) * (Math.abs(coordB.y - coordA.y) + 1);
    if (area > maxArea) {
      maxArea = area;
    }
  }
}
console.log(maxArea);
