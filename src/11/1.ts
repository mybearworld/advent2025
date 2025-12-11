import { readFile } from "node:fs/promises";

const input = await readFile("./inputs/11.txt", { encoding: "utf8" });
const machines = Object.fromEntries(
  input.split("\n").map((row) => {
    const [name, connections] = row.split(": ");
    return [name, connections.split(" ")];
  })
);

const memoizedConnectionCounts = new Map<string, number>();
const connectionCountFrom = (name: string): number => {
  if (name === "out") return 1;
  const memoizedConnectionCount = memoizedConnectionCounts.get(name);
  if (memoizedConnectionCount !== undefined) {
    return memoizedConnectionCount;
  }
  const connectionCount = machines[name]
    .map((machine) => connectionCountFrom(machine))
    .reduce((a, b) => a + b, 0);
  memoizedConnectionCounts.set(name, connectionCount);
  return connectionCount;
};

console.log(connectionCountFrom("you"));
