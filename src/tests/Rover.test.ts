import { Direction, Position, Rover } from "../Rover";

describe('Rover class', () => {
    const initialPosition: Position = [0, 0];
    const initialDirection: Direction = 'N';
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

    describe('rover getNextPosition', () => {
        let rover: Rover;
        const gridSize: [number, number] = [5, 4];
        const obstacles: Position[] = [];

        beforeEach(() => {
            rover = new Rover([0, 0], 'N', gridSize, obstacles);
        });

        it('should calculate the next position moving forward', () => {
            expect(rover['getNextPosition'](true)).toEqual([0, 1]);
        });

        it('should calculate the next position moving backward', () => {
            expect(rover['getNextPosition'](false)).toEqual([0, 3]);
        });

        it('should wrap around the grid boundaries: pacman effect', () => {
            rover.setPosition([4, 3]);
            rover.setDirection('E');
            expect(rover['getNextPosition'](true)).toEqual([0, 3]);
        });
    });

    describe('moving', () => {
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

    describe('pacman effect', () => {
        let rover: Rover;
        const gridSize: [number, number] = [5, 4];

        beforeEach(() => {
            rover = new Rover([0, 0], 'N', gridSize);
        });

        const testMovement = (direction: Direction, startPositions: Position[], endPositions: Position[], moveMethod: 'moveForward' | 'moveBackward') => {
            beforeEach(() => {
                rover.setDirection(direction);
            });

            test.each(startPositions.map((start, index) => [start, endPositions[index]]))(
                `should wrap around the grid when ${moveMethod} from %p to %p`,
                (start, end) => {
                    rover.setPosition(start);
                    rover[moveMethod]();
                    expect(rover.getPosition()).toEqual(end);
                }
            );
        };

        describe('move forward without obstacles', () => {
            describe('top edge, direction N', () => {
                testMovement('N', [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]], [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], 'moveForward');
            });

            describe('bottom edge, direction S', () => {
                testMovement('S', [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]], 'moveForward');
            });

            describe('left edge, direction W', () => {
                testMovement('W', [[0, 0], [0, 1], [0, 2], [0, 3]], [[4, 0], [4, 1], [4, 2], [4, 3]], 'moveForward');
            });

            describe('right edge, direction E', () => {
                testMovement('E', [[4, 0], [4, 1], [4, 2], [4, 3]], [[0, 0], [0, 1], [0, 2], [0, 3]], 'moveForward');
            });
        });

        describe('move backward without obstacles', () => {
            describe('top edge, direction N', () => {
                testMovement('N', [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]], 'moveBackward');
            });

            describe('bottom edge, direction S', () => {
                testMovement('S', [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]], [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], 'moveBackward');
            });

            describe('left edge, direction W', () => {
                testMovement('W', [[4, 0], [4, 1], [4, 2], [4, 3]], [[0, 0], [0, 1], [0, 2], [0, 3]], 'moveBackward');
            });

            describe('right edge, direction E', () => {
                testMovement('E', [[0, 0], [0, 1], [0, 2], [0, 3]], [[4, 0], [4, 1], [4, 2], [4, 3]], 'moveBackward');
            });
        });
    });

    describe('isObstacle method', () => {
        let rover: Rover;
        const initialPosition: Position = [0, 0];
        const gridSize: [number, number] = [5, 4];
        const obstacles: Position[] = [[2, 0], [0, 3], [3, 2]];

        beforeEach(() => {
            rover = new Rover(initialPosition, 'N', gridSize, obstacles);
        });

        it('should return true if there is an obstacle at the given position', () => {
            expect(rover['isObstacle']([2, 0])).toBe(true);
            expect(rover['isObstacle']([0, 3])).toBe(true);
            expect(rover['isObstacle']([3, 2])).toBe(true);
        });
        it('should return false if there is no obstacle at the given position', () => {
            expect(rover['isObstacle']([0, 2])).toBe(false);
        });
    });

    describe('rover movement with obstacles', () => {
        let rover: Rover;
        const gridSize: [number, number] = [5, 4];
        const obstacles: Position[] = [[2, 1], [4, 3]];

        beforeEach(() => {
            rover = new Rover([2, 0], 'N', gridSize, obstacles);
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

        it('should wrap around the grid', () => {
            rover.setPosition([4, 0]);
            rover.setDirection('E');
            rover.moveForward();
            expect(rover.getPosition()).toEqual([0, 0]);
        });
    });
});
