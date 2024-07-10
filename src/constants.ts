import { Direction } from "./types";

export const DIRECTIONS: ReadonlyArray<Direction> = ['N', 'E', 'S', 'W'];
export const MOVEMENTS: ReadonlyMap<Direction, [number, number]> = new Map([
    ['N', [0, 1]],
    ['E', [1, 0]],
    ['S', [0, -1]],
    ['W', [-1, 0]]
]);
