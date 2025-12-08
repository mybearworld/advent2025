import { readFile } from "node:fs/promises";

type Coordinate = { x: number; y: number; z: number };

type StringifiedCoordinate = `${number},${number},${number}`;
const stringifyCoordinate = (coordA: Coordinate): StringifiedCoordinate =>
  `${coordA.x},${coordA.y},${coordA.z}`;

const input = await readFile("./inputs/8.txt", { encoding: "utf8" });
const coords = input.split("\n").map((row) => {
  const [x, y, z] = row.split(",").map(Number);
  return { x, y, z } satisfies Coordinate;
});
const stopAt = Number(process.argv[2]) ?? -1;

const connectedCoords: [Coordinate, Coordinate][] = [];
for (let coordIA = 0; coordIA < coords.length; coordIA++) {
  const coordA = coords[coordIA];
  for (let coordIB = coordIA + 1; coordIB < coords.length; coordIB++) {
    const coordB = coords[coordIB];
    connectedCoords.push([coordA, coordB] as const);
  }
}
connectedCoords.sort((a, b) => {
  const da = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y, a[0].z - a[1].z);
  const db = Math.hypot(b[0].x - b[1].x, b[0].y - b[1].y, b[0].z - b[1].z);
  return da > db ? 1 : da < db ? -1 : 0;
});

const circuits: Set<StringifiedCoordinate>[] = [];
for (let i = 0; i < stopAt; i++) {
  const [coordA, coordB] = connectedCoords[i];
  const stringifiedCoordA = stringifyCoordinate(coordA);
  const stringifiedCoordB = stringifyCoordinate(coordB);
  const circuitA = circuits.find((circuit) => circuit.has(stringifiedCoordA));
  const circuitB = circuits.find((circuit) => circuit.has(stringifiedCoordB));
  const primaryCircuit = circuitA ?? circuitB;
  const secondaryCircuit = primaryCircuit === circuitA ? circuitB : circuitA;
  if (primaryCircuit) {
    if (secondaryCircuit) {
      if (primaryCircuit !== secondaryCircuit) {
        secondaryCircuit.forEach((coord) => {
          primaryCircuit.add(coord);
          secondaryCircuit.delete(coord);
        });
      }
    } else {
      primaryCircuit.add(stringifiedCoordA);
      primaryCircuit.add(stringifiedCoordB);
    }
  } else {
    circuits.push(new Set([stringifiedCoordA, stringifiedCoordB]));
  }
}
circuits.sort((a, b) => (a.size > b.size ? -1 : a.size < b.size ? 1 : 0));

console.log(
  (circuits[0].size || 1) * (circuits[1].size || 1) * (circuits[2].size || 1)
);
