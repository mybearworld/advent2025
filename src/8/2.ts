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

const circuits = new Set<Set<StringifiedCoordinate>>();
for (let i = 0; ; i++) {
  const [coordA, coordB] = connectedCoords[i];
  const stringifiedCoordA = stringifyCoordinate(coordA);
  const stringifiedCoordB = stringifyCoordinate(coordB);
  let circuitA, circuitB;
  for (const circuit of circuits) {
    if (circuit.has(stringifiedCoordA)) circuitA = circuit;
    if (circuit.has(stringifiedCoordB)) circuitB = circuit;
    if (circuitA && circuitB) break;
  }
  const primaryCircuit = circuitA ?? circuitB;
  const secondaryCircuit = primaryCircuit === circuitA ? circuitB : circuitA;
  if (primaryCircuit) {
    if (secondaryCircuit) {
      if (primaryCircuit !== secondaryCircuit) {
        secondaryCircuit.forEach((coord) => {
          primaryCircuit.add(coord);
        });
        circuits.delete(secondaryCircuit);
      }
    } else {
      primaryCircuit.add(stringifiedCoordA);
      primaryCircuit.add(stringifiedCoordB);
    }
  } else {
    circuits.add(new Set([stringifiedCoordA, stringifiedCoordB]));
  }
  if (
    circuits.size === 1 &&
    circuits.values().next().value?.size === coords.length
  ) {
    console.log(coordA.x * coordB.x);
    break;
  }
}
