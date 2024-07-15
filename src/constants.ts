import { Command, Direction, GridSize } from "./types";

export const VALID_DIRECTIONS: ReadonlyArray<Direction> = ['N', 'E', 'S', 'W'];
export const VALID_MOVEMENTS: ReadonlyMap<Direction, GridSize> = new Map([
    ['N', [0, 1]],
    ['E', [1, 0]],
    ['S', [0, -1]],
    ['W', [-1, 0]]
]);
export const VALID_COMMANDS: Command[] = ['L', 'R', 'F', 'B'];
export const GRID_DIRECTIONS: Record<Direction, string> = {
    'N': '↑',
    'E': '→',
    'S': '↓',
    'W': '←'
};
export const GREEN = '\x1b[32m';
export const RED = '\x1b[31m';
export const RESET = '\x1b[0m';
