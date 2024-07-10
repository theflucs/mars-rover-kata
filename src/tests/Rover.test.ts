import { Rover } from "../logic/Rover";
import { Direction, Position } from "../types";
import { getNextPosition, isObstacle } from "../utils";

describe('Rover class', () => {
    const initialPosition: Position = [0, 0];
    const initialDirection: Direction = 'N';
    const defaultGridSize: [number, number] = [5, 4];
    let rover: Rover;

    beforeEach(() => {
        rover = new Rover(initialPosition, initialDirection);
    });

    describe('initialization', () => {
        it('should create an instance of Rover', () => {
            expect(rover).toBeInstanceOf(Rover);
        });

        it('should correctly initialize position and direction', () => {
            expect(rover.getPosition()).toEqual(initialPosition);
            expect(rover.getDirection()).toEqual(initialDirection);
        });
    });

    describe('setters', () => {
        it('should set the correct position', () => {
            const newPosition: Position = [3, 4];
            rover.setPosition(newPosition);
            expect(rover.getPosition()).toEqual(newPosition);
        });

        it('should set the correct direction', () => {
            const newDirection: Direction = 'S';
            rover.setDirection(newDirection);
            expect(rover.getDirection()).toEqual(newDirection);
        });
    });

    describe('turning', () => {
        test.each<[string, 'turnLeft' | 'turnRight', Direction[]]>([
            ['left', 'turnLeft', ['W', 'S', 'E', 'N']],
            ['right', 'turnRight', ['E', 'S', 'W', 'N']]
        ])('should turn %s correctly', (_, turnMethod, expectedDirections) => {
            expectedDirections.forEach(expectedDirection => {
                rover[turnMethod]();
                expect(rover.getDirection()).toEqual(expectedDirection);
            });
        });
    });

    describe('movement', () => {
        describe('without obstacles', () => {
            test.each<[string, 'moveForward' | 'moveBackward', Direction, Position]>([
                ['forward', 'moveForward', 'N', [0, 1]],
                ['forward', 'moveForward', 'E', [1, 0]],
                ['backward', 'moveBackward', 'S', [0, 1]],
                ['backward', 'moveBackward', 'W', [1, 0]],
            ])('should move %s correctly when facing %s', (_, moveMethod, direction, expectedPosition) => {
                rover = new Rover(initialPosition, direction);
                rover[moveMethod]();
                expect(rover.getPosition()).toEqual(expectedPosition);
            });
        });
        describe('with obstacles', () => {
            const obstacles: Position[] = [[2, 1], [4, 3]];

            beforeEach(() => {
                rover = new Rover([2, 0], 'N', defaultGridSize, obstacles);
            });

            it('should not move when facing an obstacle', () => {
                rover.moveForward();
                expect(rover.getPosition()).toEqual([2, 0]);
            });

            it('should move when not facing an obstacle', () => {
                rover.setDirection('E');
                rover.moveForward();
                expect(rover.getPosition()).toEqual([3, 0]);
            });
        });
    });


    describe('pacman effect: wrap around grid boundaries', () => {
        type PacmanTestCase = {
            direction: Direction;
            start: Position;
            end: Position;
            method: 'moveForward' | 'moveBackward';
        }

        const testCases: PacmanTestCase[] = [
            { direction: 'N', start: [0, 3], end: [0, 0], method: 'moveForward' },
            { direction: 'S', start: [0, 0], end: [0, 3], method: 'moveForward' },
            { direction: 'W', start: [0, 0], end: [4, 0], method: 'moveForward' },
            { direction: 'E', start: [4, 0], end: [0, 0], method: 'moveForward' },
            { direction: 'N', start: [0, 0], end: [0, 3], method: 'moveBackward' },
            { direction: 'S', start: [0, 3], end: [0, 0], method: 'moveBackward' },
            { direction: 'W', start: [4, 0], end: [0, 0], method: 'moveBackward' },
            { direction: 'E', start: [0, 0], end: [4, 0], method: 'moveBackward' },
        ];
        test.each(testCases)('should wrap around when moving $method facing $direction', ({ direction, start, end, method }) => {
            rover = new Rover(start, direction as Direction, defaultGridSize);
            rover[method as 'moveForward' | 'moveBackward']();
            expect(rover.getPosition()).toEqual(end);
        });
    });

    describe('utility functions', () => {
        describe('getNextPosition', () => {
            const gridSize: [number, number] = [5, 4];

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
});
