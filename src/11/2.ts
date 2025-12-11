import { readFile } from "node:fs/promises";

const input = await readFile("./inputs/11.txt", { encoding: "utf8" });
const machines = Object.fromEntries(
  input.split("\n").map((row) => {
    const [name, connections] = row.split(": ");
    return [name, connections.split(" ")];
  })
);

const memoizedConnections = new Map<string, Connection>();
type Connection = { none: number; fft: number; dac: number; both: number };
const connectionFrom = (name: string): Connection => {
  if (name === "out") return { none: 1, fft: 0, dac: 0, both: 0 };
  const memoizedConnectionCount = memoizedConnections.get(name);
  if (memoizedConnectionCount !== undefined) {
    return memoizedConnectionCount;
  }
  const isFft = name === "fft";
  const isDac = name === "dac";
  const connectionCount = machines[name]
    .map((machine) => connectionFrom(machine))
    .reduce(
      (prev, curr) => ({
        none: prev.none + (isFft || isDac ? 0 : curr.none),
        fft: prev.fft + (isFft ? curr.none : 0) + (isDac ? 0 : curr.fft),
        dac: prev.dac + (isDac ? curr.none : 0) + (isFft ? 0 : curr.dac),
        both: prev.both + (isFft ? curr.dac : isDac ? curr.fft : 0) + curr.both,
      }),
      { none: 0, fft: 0, dac: 0, both: 0 } satisfies Connection
    );
  memoizedConnections.set(name, connectionCount);
  return connectionCount;
};

console.log(connectionFrom("svr").both);
