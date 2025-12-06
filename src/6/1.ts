import { readFile } from "node:fs/promises";

const input = await readFile("./inputs/6.txt", { encoding: "utf8" });
const rows = input.split("\n").map((line) => line.trim().split(/ +/));

let sum = 0;
for (let i = 0; i < rows[0].length; i++) {
  const numbers = [];
  for (const row of rows) {
    const column = row[i];
    if (column === "+") {
      sum += numbers.reduce((a, b) => a + b, 0);
    } else if (column === "*") {
      sum += numbers.reduce((a, b) => a * b, 1);
    } else {
      numbers.push(Number(column));
    }
  }
}
console.log(sum);
