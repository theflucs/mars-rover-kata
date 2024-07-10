import { Direction, GridSize, Position } from "../types";
import { getNextPosition, isObstacle } from "../utils";

describe('utility functions', () => {
    describe('getNextPosition', () => {
        const gridSize: GridSize = [5, 4];

        test.each([
            [[0, 0], 'N', true, [0, 1]],
            [[0, 0], 'N', false, [0, 3]],
            [[4, 3], 'E', true, [0, 3]],
        ])('should calculate the next position correctly', (start, direction, forward, expected) => {
            expect(getNextPosition(start as Position, direction as Direction, forward, gridSize)).toEqual(expected);
        });
    });

    describe('isObstacle', () => {
        const obstacles: Position[] = [[2, 0], [0, 3], [3, 2]];

        test.each([
            [[2, 0], true],
            [[0, 3], true],
            [[3, 2], true],
            [[0, 2], false],
        ])('should correctly identify obstacles', (position, expected) => {
            expect(isObstacle(position as Position, obstacles)).toBe(expected);
        });
    });
});
