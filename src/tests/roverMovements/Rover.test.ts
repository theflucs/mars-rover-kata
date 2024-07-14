import { Rover } from "../../logic/roverMovements/Rover";
import { Command, Direction, GridSize, Position } from "../../types";

describe('Rover class', () => {
    const initialPosition: Position = [0, 0];
    const initialDirection: Direction = 'N';
    const defaultGridSize: GridSize = [5, 4];
    let rover: Rover;

    beforeEach(() => {
        rover = new Rover(initialPosition, initialDirection, defaultGridSize);
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

    describe('executeCommands', () => {
        const gridSize: GridSize = [5, 4];
        const obstacles: Position[] = [[2, 0], [0, 3], [3, 2]];

        it('should handle first sequence of commands correctly', () => {
            const rover = new Rover([0, 0], 'N', gridSize, obstacles);
            const result = rover.executeCommands(['R', 'F', 'F']);
            expect(result).toEqual('O:1:0:E');
            console.log(`Result after first sequence: ${result}`);
        });

        it('should handle second sequence of commands correctly', () => {
            const rover = new Rover([1, 0], 'E', gridSize, obstacles);
            const result = rover.executeCommands(['R', 'F']);
            expect(result).toEqual('1:3:S');
            console.log(`Result after second sequence: ${result}`);
        });

        it('should handle third sequence of commands correctly', () => {
            const rover = new Rover([1, 3], 'S', gridSize, obstacles);
            const result = rover.executeCommands(['L', 'F', 'R', 'F', 'F', 'L', 'F', 'F', 'F', 'L', 'L']);
            expect(result).toEqual('0:1:W');
            console.log(`Result after third sequence: ${result}`);
        });

        it('should handle continuous movement across multiple command sequences', () => {
            const rover = new Rover([0, 0], 'N', gridSize, obstacles);

            // First sequence
            let result = rover.executeCommands(['R', 'F', 'F']);
            expect(result).toEqual('O:1:0:E');
            console.log(`Result after first sequence: ${result}`);

            // Second sequence
            result = rover.executeCommands(['R', 'F']);
            expect(result).toEqual('1:3:S');
            console.log(`Result after second sequence: ${result}`);

            // Third sequence
            result = rover.executeCommands(['L', 'F', 'R', 'F', 'F', 'L', 'F', 'F', 'F', 'L', 'L']);
            expect(result).toEqual('0:1:W');
            console.log(`Result after third sequence: ${result}`);
        });
    });
});

describe('writeOutput', () => {
    const defaultGridSize: GridSize = [5, 4];
    it('should return the correct output string without obstacles', () => {
        const rover = new Rover([2, 3], 'E', defaultGridSize);
        expect(rover.writeOutput()).toBe('2:3:E');
    });
    it('should return correct output string with obstacles', () => {
        const rover = new Rover([1, 0], 'E', defaultGridSize, [[2, 0]]);
        rover.executeCommands(['F', 'F', 'F']);
        expect(rover.writeOutput()).toBe('O:1:0:E');
    });
});
