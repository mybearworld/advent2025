import { readFile } from "node:fs/promises";

const input = await readFile("./inputs/10.txt", { encoding: "utf8" });
const machines = input.split("\n").map((row) => {
  const match = row.match(/^\[([\.#]+)\] (.+?) \{([\d,]+)\}$/);
  if (!match) throw new Error(`No match for ${row}`);
  return {
    requiredState: [...match[1]].map((s) => s === "#"),
    buttons: match[2].split(" ").map((button) => {
      return button
        .slice(1, -1)
        .split(",")
        .map((n) => Number(n));
    }),
    joltages: match[3].split(",").map((n) => Number(n)),
  };
});

const getCombinations = function* <T>(
  arr: T[],
  amount: number
): Generator<T[]> {
  if (amount === 1) {
    for (const item of arr) {
      yield [item];
    }
    return;
  }
  for (const item of arr) {
    const lowerCombinations = getCombinations(arr, amount - 1);
    for (const combination of lowerCombinations) {
      yield [item, ...combination];
    }
  }
  return;
};

const applyButtons = (size: number, buttons: number[][]) => {
  const arr = Array.from({ length: size }).fill(false);
  buttons.forEach((button) => {
    button.forEach((number) => {
      arr[number] = !arr[number];
    });
  });
  return arr;
};

let sum = 0;
for (const machine of machines) {
  counter: for (let i = 1; ; i++) {
    const combinations = getCombinations(machine.buttons, i);
    for (const buttons of combinations) {
      const state = applyButtons(machine.requiredState.length, buttons);
      if (machine.requiredState.every((required, i) => required === state[i])) {
        sum += i;
        break counter;
      }
    }
  }
}
console.log(sum);
