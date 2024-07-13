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

            it('should throw an error when facing an obstacle', () => {
                expect(() => {
                    rover.moveForward();
                }).toThrow('Obstacle detected at 2,1');
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

        describe('single command movements', () => {
            test.each([
                [[0, 0], 'N', 'F', [0, 1], 'move forward facing north'],
                [[0, 0], 'N', 'B', [0, 3], 'move backward facing north (wrap)'],
                [[0, 0], 'E', 'F', [1, 0], 'move forward facing east'],
                [[4, 0], 'E', 'F', [0, 0], 'move forward facing east (wrap)'],
                [[0, 0], 'S', 'F', [0, 3], 'move forward facing south (wrap)'],
                [[0, 0], 'S', 'B', [0, 1], 'move backward facing south'],
                [[0, 0], 'W', 'F', [4, 0], 'move forward facing west (wrap)'],
                [[1, 0], 'W', 'F', [0, 0], 'move forward facing west'],
            ])('should %s', (startPos, startDir, command, expectedPos) => {
                const rover = new Rover(startPos as Position, startDir as Direction, gridSize);
                rover.executeCommands([command as Command]);
                expect(rover.getPosition()).toEqual(expectedPos);
            });
        });

        describe('rotation commands', () => {
            test.each([
                ['N', ['R'], 'E', 'turn right from north'],
                ['E', ['R'], 'S', 'turn right from east'],
                ['S', ['R'], 'W', 'turn right from south'],
                ['W', ['R'], 'N', 'turn right from west'],
                ['N', ['L'], 'W', 'turn left from north'],
                ['W', ['L'], 'S', 'turn left from west'],
                ['S', ['L'], 'E', 'turn left from south'],
                ['E', ['L'], 'N', 'turn left from east'],
            ])('should %s', (startDir, commands, expectedDir) => {
                const rover = new Rover([0, 0], startDir as Direction, gridSize);
                rover.executeCommands(commands as Command[]);
                expect(rover.getDirection()).toEqual(expectedDir);
            });
            it('should rotate correctly with multiple turns', () => {
                const rover = new Rover([0, 0], 'N', gridSize);
                rover.executeCommands(['R', 'R', 'R', 'R']);
                expect(rover.getDirection()).toEqual('N');
            });
        });

        describe('complex command sequences', () => {
            test('should handle a sequence of movements and rotations', () => {
                const rover = new Rover([0, 0], 'N', gridSize);
                rover.executeCommands(['F', 'R', 'F', 'F', 'L', 'B', 'L', 'F']);
                expect(rover.getPosition()).toEqual([1, 0]);
                expect(rover.getDirection()).toEqual('W');
            });
            it('should wrap around both axes', () => {
                const rover = new Rover([4, 0], 'E', gridSize);
                rover.executeCommands(['F', 'F', 'R', 'F', 'F']);
                expect(rover.getPosition()).toEqual([1, 2]);
                expect(rover.getDirection()).toEqual('S');
            });
        });

        describe('executeCommands', () => {
            const gridSize: GridSize = [5, 4];
            describe('without obstacles', () => {
                const gridSize: GridSize = [5, 4];
                describe('handle a sequence of commands in different directions', () => {
                    test.each<[string, 'moveForward' | 'moveBackward', Direction, Position]>([
                        ['moving forward from (0,0) facing N', 'moveForward', 'N', [0, 1]],
                        ['moving forward from (0,0) facing E', 'moveForward', 'E', [1, 0]],
                        ['moving backward from (0,0) facing S', 'moveBackward', 'S', [0, 1]],
                        ['moving backward from (0,0) facing W', 'moveBackward', 'W', [1, 0]],
                    ])('should move %s correctly when facing %s', (_, moveMethod, direction, expectedPosition) => {
                        const rover = new Rover([0, 0], direction, gridSize);
                        rover[moveMethod]();
                        expect(rover.getPosition()).toEqual(expectedPosition);
                    });
                });

                it('should handle a sequence of commands without obstacles', () => {
                    const rover = new Rover([0, 0], 'N', gridSize);
                    rover.executeCommands(['F', 'R', 'F', 'F', 'L', 'B', 'L', 'F']);
                    expect(rover.getPosition()).toEqual([1, 0]);
                    expect(rover.getDirection()).toEqual('W');
                });

                it('should handle wrap around commands in both axes without obstacles', () => {
                    const rover = new Rover([4, 0], 'E', gridSize);
                    rover.executeCommands(['F', 'F', 'R', 'F', 'F']);
                    expect(rover.getPosition()).toEqual([1, 2]);
                    expect(rover.getDirection()).toEqual('S');
                });
            });
            describe('with obstacles', () => {
                const gridSize: GridSize = [5, 4];

                describe('handle obstacle in different directions', () => {
                    const gridSize: GridSize = [5, 4];
                    const initialPosition: Position = [2, 1];
                    const obstacles: Position[] = [
                        [2, 2],
                        [3, 1],
                        [2, 0],
                        [1, 1]
                    ];
                    test.each<[string, 'F' | 'B', Direction, Position]>([
                        ['forward', 'F', 'N', [2, 1]],
                        ['forward', 'F', 'E', [2, 1]],
                        ['forward', 'F', 'S', [2, 1]],
                        ['forward', 'F', 'W', [2, 1]],
                    ])('should stop moving %s when facing an obstacle in direction %s', (_, command, direction, expectedPosition) => {
                        const rover = new Rover(initialPosition, direction, gridSize, obstacles);
                        rover.executeCommands([command]);
                        expect(rover.getPosition()).toEqual(expectedPosition);
                        expect(rover.getDirection()).toEqual(direction);
                    });
                });

                it('should detect an immediate obstacle and not move', () => {
                    const initialPosition: Position = [0, 0];
                    const immediateObstacle: Position[] = [[0, 1]];
                    const rover = new Rover(initialPosition, 'N', gridSize, immediateObstacle);

                    rover.executeCommands(['F']);
                    expect(rover.getPosition()).toEqual(initialPosition);
                    expect(rover.getDirection()).toBe('N');
                });

                it('should stop the sequence when an obstacle error has been thrown', () => {
                    const rover = new Rover([2, 0], 'N', gridSize, [[2, 1]]);
                    rover.executeCommands(['F', 'F', 'F']);
                    expect(rover.getPosition()).toEqual([2, 0]);
                    expect(rover.getDirection()).toBe('N');
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
    });
});
