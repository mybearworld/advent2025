import { readFile } from "node:fs/promises";

const input = await readFile("./inputs/6.txt", { encoding: "utf8" });
const rows = input.split("\n").map((line) => line.split(""));

const getColumn = (columnNumber: number) => {
  let operator: "add" | "multiply" | null = null;
  let number = 0;
  let hadColumn = false;
  for (const row of rows) {
    const column = row[columnNumber];
    if (column === " ") {
      continue;
    }
    hadColumn = true;
    if (column === "+") {
      operator = "add";
    } else if (column === "*") {
      operator = "multiply";
    } else {
      number = number === 0 ? Number(column) : number * 10 + Number(column);
    }
  }
  if (!hadColumn) return null;
  return { operator, number };
};

let numbers = [];
let sum = 0;
for (let columnNumber = rows[0].length - 1; columnNumber >= 0; columnNumber--) {
  const operation = getColumn(columnNumber);
  if (operation === null) continue;
  numbers.push(operation.number);
  if (operation.operator === "add") {
    sum += numbers.reduce((a, b) => a + b, 0);
    numbers = [];
  } else if (operation.operator === "multiply") {
    sum += numbers.reduce((a, b) => a * b, 1);
    numbers = [];
  }
}
console.log(sum);
